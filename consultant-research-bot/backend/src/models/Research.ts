import mongoose, { Schema, Document } from 'mongoose';

export interface IResearch extends Document {
  title: string;
  query: string;
  project: mongoose.Types.ObjectId;
  creator: mongoose.Types.ObjectId;
  depth: number;
  breadth: number;
  template: string;
  clientContext: string;
  industryFocus: string;
  result: {
    answer: string;
    learnings: string[];
    visitedUrls: string[];
    executiveSummary?: string;
    recommendations?: string[];
  };
  status: string;
}

const ResearchSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    query: { type: String, required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    depth: { type: Number, default: 2 },
    breadth: { type: Number, default: 4 },
    template: { 
      type: String, 
      enum: ['quick_overview', 'deep_dive', 'comprehensive', 'competitive_analysis', 'custom'], 
      default: 'custom' 
    },
    clientContext: { type: String },
    industryFocus: { type: String },
    result: {
      answer: { type: String },
      learnings: [{ type: String }],
      visitedUrls: [{ type: String }],
      executiveSummary: { type: String },
      recommendations: [{ type: String }]
    },
    status: { 
      type: String, 
      enum: ['pending', 'in_progress', 'completed', 'failed'], 
      default: 'pending' 
    },
  },
  { timestamps: true }
);

export default mongoose.model<IResearch>('Research', ResearchSchema); 