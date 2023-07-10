// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
// Define middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.authenticated) {
    // User is authenticated, so continue to the next middleware or route handler
    next();
  } else {
    // User is not authenticated, so redirect to the login page
    res.redirect("/login");
  }
};

app.set("view engine", "ejs");
mongoose
  .connect(
    // "mongodb+srv://Bangthai:428jesqb9t@cluster0.dkzah.mongodb.net/feedback",
    "mongodb+srv://bangthai:428jesqb9t@cluster0.gyv4qie.mongodb.net/Alumni-Feedback",

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", function (req, res) {
  res.render("home");
});
// Define Alumni Feedback schema
const alumniFeedbackSchema = new mongoose.Schema({
  fullName: String,
  programme: String,
  periodOfStudy: String,

  // qualityOfEducation: Number,
  careerPreparation: Number,
  campusCulture: Number,
  campusResources: Number,
  alumniEngagement: Number,

  diversityAndInclusion: Number,
  campusFacilities: Number,
  campusSafety: Number,
  academicSupport: Number,
  studentFacultyInteraction: Number,

  technologyResources: Number,
  financialAidAndAffordability: Number,
  graduateSchoolPreparation: Number,
  alumniNetwork: Number,
  internshipOpportunities: Number,

  extracurricularOpportunities: Number,
  distanceLearningOptions: Number,
  campusSustainability: Number,
  globalPerspective: Number,
  overallSatisfaction: Number,
});

const AlumniFeedback = mongoose.model("AlumniFeedback", alumniFeedbackSchema);

// Use body-parser middleware to parse the form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static HTML file
app.use(express.static("public"));

// Handle form submission
app.post("/feedback", (req, res) => {
  const feedback = new AlumniFeedback({
    fullName: req.body.fullName,
    programme: req.body.programme,

    periodOfStudy: req.body.periodOfStudy,

    // qualityOfEducation: req.body["qualityOfEducation"],
    careerPreparation: req.body["careerPreparation"],
    campusCulture: req.body["campusCulture"],
    campusResources: req.body["campusResources"],
    alumniEngagement: req.body["alumniEngagement"],
    diversityAndInclusion: req.body["diversityAndInclusion"],
    campusFacilities: req.body["campusFacilities"],
    campusSafety: req.body["campusSafety"],
    academicSupport: req.body["academicSupport"],
    studentFacultyInteraction: req.body["studentFacultyInteraction"],
    technologyResources: req.body["technologyResources"],
    financialAidAndAffordability: req.body["financialAidAndAffordability"],
    graduateSchoolPreparation: req.body["graduateSchoolPreparation"],
    alumniNetwork: req.body["alumniNetwork"],
    internshipOpportunities: req.body["internshipOpportunities"],
    extracurricularOpportunities: req.body["extracurricularOpportunities"],
    distanceLearningOptions: req.body["distanceLearningOptions"],
    campusSustainability: req.body["campusSustainability"],
    globalPerspective: req.body["globalPerspective"],
    overallSatisfaction: req.body["overallSatisfaction"],
  });

  feedback.save((err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.render("feedback");
    }
  });
});

app.get("/ratings", async (req, res) => {
  try {
    const ratings = await AlumniFeedback.find(
      {},
      {
        // qualityOfEducation: 1,
        careerPreparation: 1,
        campusCulture: 1,
        campusResources: 1,
        alumniEngagement: 1,
        diversityAndInclusion: 1,
        campusFacilities: 1,
        campusSafety: 1,
        academicSupport: 1,
        studentFacultyInteraction: 1,
        technologyResources: 1,
        financialAidAndAffordability: 1,
        graduateSchoolPreparation: 1,
        alumniNetwork: 1,
        internshipOpportunities: 1,
        extracurricularOpportunities: 1,
        distanceLearningOptions: 1,
        campusSustainability: 1,
        globalPerspective: 1,
        overallSatisfaction: 1,
      }
    );
    const count = {
      // qualityOfEducation: { 1: 0, 2: 0, 3: 0, 4: 0 },
      careerPreparation: { 1: 0, 2: 0, 3: 0, 4: 0 },
      campusCulture: { 1: 0, 2: 0, 3: 0, 4: 0 },
      campusResources: { 1: 0, 2: 0, 3: 0, 4: 0 },
      alumniEngagement: { 1: 0, 2: 0, 3: 0, 4: 0 },
      diversityAndInclusion: { 1: 0, 2: 0, 3: 0, 4: 0 },
      campusFacilities: { 1: 0, 2: 0, 3: 0, 4: 0 },
      campusSafety: { 1: 0, 2: 0, 3: 0, 4: 0 },
      academicSupport: { 1: 0, 2: 0, 3: 0, 4: 0 },
      studentFacultyInteraction: { 1: 0, 2: 0, 3: 0, 4: 0 },
      technologyResources: { 1: 0, 2: 0, 3: 0, 4: 0 },
      financialAidAndAffordability: { 1: 0, 2: 0, 3: 0, 4: 0 },
      graduateSchoolPreparation: { 1: 0, 2: 0, 3: 0, 4: 0 },
      alumniNetwork: { 1: 0, 2: 0, 3: 0, 4: 0 },
      internshipOpportunities: { 1: 0, 2: 0, 3: 0, 4: 0 },
      extracurricularOpportunities: { 1: 0, 2: 0, 3: 0, 4: 0 },
      distanceLearningOptions: { 1: 0, 2: 0, 3: 0, 4: 0 },
      campusSustainability: { 1: 0, 2: 0, 3: 0, 4: 0 },
      globalPerspective: { 1: 0, 2: 0, 3: 0, 4: 0 },
      overallSatisfaction: { 1: 0, 2: 0, 3: 0, 4: 0 },
    };
    ratings.forEach((rating) => {
      // count.qualityOfEducation[rating.qualityOfEducation]++;
      count.careerPreparation[rating.careerPreparation]++;
      count.campusCulture[rating.campusCulture]++;
      count.campusResources[rating.campusResources]++;
      count.alumniEngagement[rating.alumniEngagement]++;

      count.diversityAndInclusion[rating.diversityAndInclusion]++;
      count.campusFacilities[rating.campusFacilities]++;
      count.campusSafety[rating.campusSafety]++;
      count.academicSupport[rating.academicSupport]++;
      count.studentFacultyInteraction[rating.studentFacultyInteraction]++;

      count.technologyResources[rating.technologyResources]++;
      count.financialAidAndAffordability[rating.financialAidAndAffordability]++;
      count.graduateSchoolPreparation[rating.graduateSchoolPreparation]++;
      count.alumniNetwork[rating.alumniNetwork]++;
      count.internshipOpportunities[rating.internshipOpportunities]++;

      count.extracurricularOpportunities[rating.extracurricularOpportunities]++;
      count.distanceLearningOptions[rating.distanceLearningOptions]++;
      count.campusSustainability[rating.campusSustainability]++;
      count.globalPerspective[rating.globalPerspective]++;
      count.overallSatisfaction[rating.overallSatisfaction]++;
    });
    const countJSON = JSON.stringify(count);
    const countObject = JSON.parse(countJSON);
    res.render("ratings", { count: countObject });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

//login
app.get("/login", (req, res) => {
  res.render("login");
});

// Handle login form submission
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "adminGroupD@kscj.com" && password === "ADMINgroupD@123") {
    // Set authenticated session variable and redirect to messages page
    req.session.authenticated = true;
    res.redirect("/ratings");
  } else {
    res.render("login", { error: "Invalid email or password" });
  }
});

app.get("/database", isAuthenticated, async (req, res) => {
  try {
    const feedback = await AlumniFeedback.find(
      {},
      { fullName: 1, programme: 1, periodOfStudy: 1 }
    );
    res.render("database", { feedback });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
