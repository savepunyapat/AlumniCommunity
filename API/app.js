const express = require("express");
const app = express();
const mongoose = require("mongoose");
const GalleryRoute = require("./routes/GalleryRoute");
const PostRoute = require("./routes/PostRoute");
const AccountRoute = require("./routes/AccountRoute");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const User = require("./models/AlumniAccount");
const cors = require("cors");
const e = require("express");
const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.json());
require("dotenv").config();
const mongoKey = process.env.MONGO_KEY;
mongoose.set("strictQuery", false);
mongoose
  .connect(mongoKey)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(error);
  });

//mail sending

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendEventPostcard = (recipientEmail, postcardContent, eventSubject) => {
  const mailOptions = {
    from: "punyapat810@gmail.com",
    to: recipientEmail,
    subject: eventSubject,
    html: postcardContent,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
const sendEventPostcardToAllAccount = async (
  postcardContent,
  eventSubject,
  stdBatch,
) => {
  if (stdBatch !== 'e') {
    const allUsers = await User.find({ StdID: new RegExp(`^${stdBatch}`) });
    allUsers.forEach((user) => {
      const mailOptions = {
        from: "punyapat810@gmail.com",
        to: user.Email,
        subject: eventSubject || "Default Event Subject",
        html: postcardContent,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(`Error sending postcard to ${user.email}:`, error);
        } else {
          console.log(`Postcard sent to ${user.email}: ${info.response}`);
        }
      });
    });
  } else {
    const allUsers = await User.find({});
    allUsers.forEach((user) => {
      const mailOptions = {
        from: "punyapat810@gmail.com",
        to: user.Email,
        subject: eventSubject || "Default Event Subject",
        html: postcardContent,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(`Error sending postcard to ${user.email}:`, error);
        } else {
          console.log(`Postcard sent to ${user.email}: ${info.response}`);
        }
      });
    });
  }
};

const findBatch = async (req, res) => {
  try {
    const { batch } = req.body;
    const allUsers = await User.find({ StdID: new RegExp(`^${batch}`) });
    console.log(allUsers);
    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendBirthdayPostcard = (recipientEmail, postcardContent) => {
  const mailOptions = {
    from: "punyapat810@gmail.com",
    to: recipientEmail,
    subject: "Birthday Postcard",
    html: postcardContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
schedule.scheduleJob("0 0 * * *", async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const usersWithBirthday = await User.find({
    Birthday: {
      $gte: today,
      $lt: tomorrow,
    },
  });
  usersWithBirthday.forEach((user) => {
    const postcardContent = `<p>Happy Birthday, ${user.name}!</p>`; // Customize the postcard content
    sendBirthdayPostcard(user.Email, postcardContent);
  });
});

/*  
const testsending = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const usersWithBirthday = await User.find({
        Birthday: {
            $gte: today,
            $lt: tomorrow,
        },
    });
    console.log(usersWithBirthday)
    console.log(today)
    usersWithBirthday.forEach(user => {
        const postcardContent = `<p>Happy Birthday, ${user.name}!</p>`; // Customize the postcard content
        sendBirthdayPostcard(user.Email, postcardContent);
    });
}
*/

//Routes

app.post("/find-batch", findBatch);

app.post("/send-event-postcard-to-all-account", (req, res) => {
  const { postcardContent, eventSubject,stdBatch } = req.body;

  sendEventPostcardToAllAccount(postcardContent, eventSubject,stdBatch);

  res.status(200).json({ success: true });
});

app.post("/send-birthday-postcard", (req, res) => {
  const { recipientEmail, postcardContent } = req.body;

  sendBirthdayPostcard(recipientEmail, postcardContent);

  res.status(200).json({ success: true });
});
app.post("/send-event-postcard", (req, res) => {
  const { recipientEmail, postcardContent, eventSubject } = req.body;

  sendEventPostcard(recipientEmail, postcardContent, eventSubject);

  res.status(200).json({ success: true });
});

app.get("/", (req, res) => {
  res.send("Home");
});


app.get('/search', async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const query = {
      $or: [
        { FirstName: { $regex: new RegExp(searchTerm, 'i') } },
        { LastName: { $regex: new RegExp(searchTerm, 'i') } },
        { StdID: { $regex: new RegExp(searchTerm, 'i') } },
        { 'WorkPlace.CompanyName':{ $regex: new RegExp(searchTerm, 'i') } },
      ],
    };

    const alumni = await User.find(query);
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use(GalleryRoute);
app.use(PostRoute);
app.use(AccountRoute);
app.listen(8000, () => {
  console.log("listening port 8000");
});
