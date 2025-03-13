// import fetch from 'node-fetch';
import mongoose from 'mongoose';
import Research, { IResearch } from '../models/Research';

// We'll use dynamic import for node-fetch as it's an ESM module
const fetchModule = import('node-fetch').then(module => module.default);

interface ResearchConfig {
  query: string;
  projectId: string;
  userId: string;
  template: string;
  depth?: number;
  breadth?: number;
  clientContext?: string;
  industryFocus?: string;
}

interface ResearchResult {
  answer: string;
  learnings: string[];
  visitedUrls: string[];
  executiveSummary?: string;
  recommendations?: string[];
}

class DeepResearchService {
  private apiUrl: string;
  
  constructor() {
    this.apiUrl = process.env.DEEP_RESEARCH_API_URL || 'http://localhost:3051';
  }
  
  async initiateResearch(config: ResearchConfig): Promise<string> {
    try {
      // Create a new research record
      const research = new Research({
        title: config.query.substring(0, 100),
        query: config.query,
        project: config.projectId,
        creator: config.userId,
        template: config.template,
        clientContext: config.clientContext,
        industryFocus: config.industryFocus,
        status: 'pending'
      });
      
      // Set depth and breadth based on template or custom values
      if (config.depth && config.breadth) {
        research.depth = config.depth;
        research.breadth = config.breadth;
      } else {
        const params = this.getParametersForTemplate(config.template);
        research.depth = params.depth;
        research.breadth = params.breadth;
      }
      
      await research.save();
      
      // Start the research process in the background
      // Use type assertion for _id since mongoose types can be tricky
      const researchId = research._id as unknown as mongoose.Types.ObjectId;
      this.runResearchProcess(researchId.toString()).catch(error => {
        console.error('Background research process error:', error);
      });
      
      return researchId.toString();
    } catch (error) {
      console.error('Error initiating research:', error);
      throw error;
    }
  }
  
  private async runResearchProcess(researchId: string): Promise<void> {
    try {
      // Get the research record
      const research = await Research.findById(researchId);
      if (!research) {
        throw new Error(`Research ${researchId} not found`);
      }
      
      // Update status to in_progress
      research.status = 'in_progress';
      await research.save();
      
      // Call the Deep Research API
      const fetch = await fetchModule;
      const response = await fetch(`${this.apiUrl}/api/research`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: research.query,
          depth: research.depth,
          breadth: research.breadth,
        }),
      });
      
      // Get the result
      const result = await response.json() as any;
      
      if (!response.ok) {
        throw new Error(`API error: ${result.error || 'Unknown error'}`);
      }
      
      // Enhance the result with executive summary and recommendations
      const enhancedResult = await this.enhanceResearchResult(result, research);
      
      // Update the research record with results
      research.result = enhancedResult;
      research.status = 'completed';
      await research.save();
    } catch (error) {
      console.error(`Research process error for ${researchId}:`, error);
      // Update research status to failed
      const research = await Research.findById(researchId);
      if (research) {
        research.status = 'failed';
        await research.save();
      }
    }
  }
  
  private getParametersForTemplate(template: string): { depth: number; breadth: number } {
    switch (template) {
      case 'quick_overview':
        return { depth: 1, breadth: 3 };
      case 'deep_dive':
        return { depth: 4, breadth: 3 };
      case 'comprehensive':
        return { depth: 3, breadth: 8 };
      case 'competitive_analysis':
        return { depth: 3, breadth: 5 };
      default:
        return { depth: 2, breadth: 4 };
    }
  }
  
  private async enhanceResearchResult(result: any, research: IResearch): Promise<ResearchResult> {
    // Generate executive summary using the results
    const executiveSummary = await this.generateExecutiveSummary(
      result.answer, 
      research.clientContext
    );
    
    // Generate recommendations
    const recommendations = await this.generateRecommendations(
      result.answer,
      result.learnings,
      research.industryFocus
    );
    
    return {
      ...result,
      executiveSummary,
      recommendations,
    };
  }
  
  private async generateExecutiveSummary(answer: string, clientContext?: string): Promise<string> {
    // In a real implementation, you might call an LLM to generate this
    // For now, we'll return a simplified version
    return `Executive Summary: ${answer.substring(0, 300)}...

This summary is tailored for ${clientContext || 'your client'}.`;
  }
  
  private async generateRecommendations(
    answer: string, 
    learnings: string[],
    industryFocus?: string
  ): Promise<string[]> {
    // In a real implementation, you might call an LLM to generate recommendations
    // For now, return simple recommendations
    return [
      `Based on our research, we recommend focusing on key areas relevant to ${industryFocus || 'your industry'}.`,
      "Consider implementing the strategies outlined in the research findings.",
      "Further investigation may be warranted in areas where data is incomplete."
    ];
  }
  
  async getResearch(researchId: string): Promise<any> {
    return Research.findById(researchId)
      .populate('creator', 'firstName lastName email')
      .populate('project', 'name client');
  }
  
  async listResearchForProject(projectId: string): Promise<any[]> {
    return Research.find({ project: projectId })
      .sort({ createdAt: -1 })
      .populate('creator', 'firstName lastName');
  }
}

export default new DeepResearchService(); 