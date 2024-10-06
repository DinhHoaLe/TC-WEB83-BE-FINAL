const AdditionalInfoSchema = new Schema({
  interesting: {
    type: String,
    required: false,
  },
  personalGoals: {
    type: String,
    required: false,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const AdditionalInfo = mongoose.model("AdditionalInfo", AdditionalInfoSchema);

export default AdditionalInfo;
