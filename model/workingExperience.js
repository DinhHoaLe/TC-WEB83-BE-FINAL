const WorkingExperienceSchema = new Schema({
  skills: {
    type: String,
    required: true,
  },
  personalProject: [
    {
      projectName: { type: String, required: true },
      task: { type: String, required: true },
      position: { type: String, required: true },
      completionTime: { type: Date },
      startTime: { type: Date },
      endTime: { type: Date },
    },
  ],
  company: [
    {
      companyName: { type: String, required: true },
      position: { type: String, required: true },
      startTime: { type: Date },
      endTime: { type: Date }, 
    },
  ],
  userID: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user",
    required: true,
  },
});

const WorkingExperience = mongoose.model(
  "WorkingExperience",
  WorkingExperienceSchema
);
export default WorkingExperience;
