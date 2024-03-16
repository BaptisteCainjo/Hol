import User from "../models/user.js";
import bcrypt from "bcrypt";
import { SALT, VERIF_USERS, encryptSecretKey } from "../utils/config.js";
import sendEmail from "../config/nodemailer-config.js";
import passport from "passport";
import { initPassport } from "../config/passport-config.js";
import jwt from "jsonwebtoken";
import {
  titleSend,
  titleReSend,
  sendWelcomeEmail,
  resendCodeEmail,
  sendWelcomeEmailToArtisan,
  titleSendToCompany,
  sendEmailToCompany,
  titleSendToArtisan,
  titleSendToCompanyArtisan,
  sendEmailToCompanyArtisan,
} from "../utils/email-config.js";
import Shop from "../models/shop.js";

initPassport(
  passport,
  async (email) => await User.findOne({ email }),
  async (id) => await User.findById(id)
);

export async function registerUser(req, res) {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, SALT);
    const hashConfirmPassword = await bcrypt.hash(
      req.body.confirmPassword,
      SALT
    );

    const user = new User({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      password: hashPassword,
      confirmPassword: hashConfirmPassword,
      verified: req.body.verified,
      role: req.body.role,
      verifiedByAdmin: req.body.verifiedByAdmin,
      secretKey: req.body.secretKey,
    });

    await user.save();
    console.log(
      `Utilisateur ${user.lastName} avec l'adresse ${user.email} a été enregistré avec succès !`
    );
  } catch (e) {
    console.log("Erreur lors de l'ajout d'un utilisateur.", e);
  }
}

export async function registerArtisan(req, res) {
  // Il y a maintenant un champ owner dans le modèle Shop
  /* const userEmail = req.params.userEmail;
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }
    user.shop = {
      name: req.body.shopName,
      address: req.body.shopAddress,
      tel: req.body.shopTel,
      iban: req.body.shopIban,
      siret: req.body.shopSiret,
    };
    await user.save();
    console.log(
      `La boutique ${user.shop.name} a été enregistrée avec succès !`
    );
    res.json(user);
  } catch (e) {
    console.log("Erreur lors de l'enregistrement de l'utilisateur.", e);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la mise à jour de la boutique." });
  } */
}
export async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(500).json({
      message: "Erreur lors de la recherche des utilisateurs.",
    });
  }
}

export async function getUser(req, res) {
  try {
    const userEmail = req.params.userEmail;
    const user = await User.findOne({ email: userEmail });
    res.json(user);
  } catch (e) {
    res.status(500).json({
      message: "Erreur lors de la recherche de l'utilisateur.",
    });
  }
}

export async function writeEmail(req, res) {
  try {
    const { firstName, lastName, email, secretKey } = req.query;
    const formatedMail = await sendEmail(
      email,
      titleSend
        .replace("{{firstName}}", firstName)
        .replace("{{lastName}}", lastName),
      ``,
      sendWelcomeEmail(firstName, lastName, secretKey)
    );
    res.send(formatedMail);
  } catch (error) {
    res.send(error);
  }
}

export async function writeEmailToArtisan(req, res) {
  try {
    const { firstName, lastName, email, secretKey, shopName } = req.query;
    const formatedMail = await sendEmail(
      email,
      titleSendToArtisan
        .replace("{{firstName}}", firstName)
        .replace("{{lastName}}", lastName)
        .replace("{{shopName}}", shopName),
      ``,
      sendWelcomeEmailToArtisan(firstName, lastName, shopName, secretKey)
    );
    res.send(formatedMail);
  } catch (error) {
    res.send(error);
  }
}

export async function rewriteEmail(req, res) {
  try {
    const { firstName, lastName, email, secretKey } = req.query;
    const formatedMail = await sendEmail(
      email,
      titleReSend,
      ``,
      resendCodeEmail(firstName, lastName, secretKey)
    );
    res.send(formatedMail);
  } catch (error) {
    res.send(error);
  }
}

export async function resendKey(req, res) {
  try {
    const { email, secretKey } = req.query;
    const user = await User.updateOne({ email }, { secretKey });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({
      message: "Erreur lors de la recherche des utilisateurs.",
    });
  }
}

export async function verifyUser(req, res) {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email: email });
    const shop = await Shop.findOne({ owner: user._id });
    console.log(shop)
    if (user && user.secretKey) {
      const response = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        createdAt: user.createdAt,
        secretKey: user.secretKey,
        shopName: shop ? shop.name : null,
        shopAddress: shop ? shop.address : null,
        shopTel: shop ? shop.phoneNumber : null,
        shopIban: shop ? shop.iban : null,
        shopSiret: shop ? shop.siret : null,
      };

      res.status(200).json(response);
    } else {
      res
        .status(404)
        .json({ message: "Utilisateur non trouvé ou clé secrète manquante." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la vérification de l'utilisateur" });
  }
}

export async function updateVerifiedStatus(req, res) {
  try {
    const { email, verified } = req.body;
    const user = await User.updateOne({ email }, { verified });
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du statut 'verified'" });
  }
}

export async function writeMailToCompany(req, res) {
  try {
    const {
      firstName,
      lastName,
      email,
      createdAt,
      shopAddress,
      shopIban,
      shopName,
      shopSiret,
      shopTel,
      secretKey,
    } = req.query;
    console.log(req.query);

    if (shopName === "undefined") {
      const MailToCompany = await sendEmail(
        "contact.hollcompany@gmail.com",
        titleSendToCompany
          .replace("{{firstName}}", firstName)
          .replace("{{lastName}}", lastName),
        ``,
        sendEmailToCompany(firstName, lastName, email, createdAt)
      );
      res.send(MailToCompany);
      await User.updateOne({ email: email }, { secretKey: "******" });
    } else {
      const MailToCompany = await sendEmail(
        "contact.hollcompany@gmail.com",
        titleSendToCompanyArtisan
          .replace("{{shopName}}", shopName)
          .replace("{{firstName}}", firstName)
          .replace("{{lastName}}", lastName),
        ``,
        sendEmailToCompanyArtisan(
          firstName,
          lastName,
          email,
          createdAt,
          shopAddress,
          shopIban,
          shopName,
          shopSiret,
          shopTel,
          VERIF_USERS
        )
      );
      res.send(MailToCompany);
    }
  } catch (error) {
    res.send(error);
  }
}

export async function verifyUserByAdmin(req, res) {
  try {
    const { email } = req.query;
    await User.updateOne({ email: email }, { verifiedByAdmin: true });
    res.status(200).json(`Utilisateur ${email} vérifié par l'admin`);
  } catch (error) {
    res.send(error);
  }
}

export async function getLoginUser(req, res, next) {
  if (req.isAuthenticated()) {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);
    const shop = await Shop.findOne({ owner: userId });

    let conditionalData = {};
    if (user.role === "artisan") {
      conditionalData = {
        shopName: shop.name,
        shopAddressStreet: shop.address.street,
        shopAddressCity: shop.address.city,
        shopAddressPostalCode: shop.address.postalCode,
        shopAddressCountry: shop.address.country,
        shopPhoneNumber: shop.phoneNumber,
      };
    }

    const responseData = {
      message: "Vous êtes connecté.",
      _id: userId,
      email: user.email,
      lastName: user.lastName,
      firstName: user.firstName,
      role: user.role,
      ...conditionalData,
    };

    res.status(200).json(responseData);
  } else {
    res.status(401).json({ message: "Vous n'êtes pas connecté." });
  }
}

export async function loginUser(req, res, next) {
  const { email, password } = req.body;

  passport.authenticate("local", async (err, userFind, info) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de la connexion." });
    }

    const user = await User.findOne({ email: email });

    if (user === null) {
      return res
        .status(401)
        .json({ message: "Adresse e-mail ou mot de passe incorrect." });
    }

    if (!user.verified) {
      return res
        .status(403)
        .json({ message: "Votre compte n'est pas vérifié." });
    }

    if (email === "" || password === "") {
      return res
        .status(400)
        .json({ message: "Les informations ne sont pas complètes." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Adresse e-mail ou mot de passe incorrect." });
    }

    const tokenData = {
      userId: user._id,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    req.logIn(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erreur lors de la connexion." });
      }

      if (req.isAuthenticated()) {
        return res.status(200).json({message: "Vous êtes connecté."});
      } else {
        return res
          .status(500)
          .json({ message: "Erreur lors de l'authentification." });
      }
    });
  })(req, res, next);
}

export async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
}

export function logoutUser(req, res, next) {
  res.clearCookie("token");
  req.logout(() => {
    res.redirect("/");
  });
}
