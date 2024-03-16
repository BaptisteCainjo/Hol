import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

export function initPassport(passport, getUserByEmail, getUserById) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await getUserByEmail(email);

          if (!user || !(await bcrypt.compare(password, user.password))) {
            return done(null, false, {
              message: "Incorrect email or password",
            });
          }

          return done(null, user);
        } catch (error) {
          console.error("Error during authentication:", error);
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

export default initPassport;
