export const SALT = 10;
export const URL = "http://localhost:5000/";
export const VERIF_USERS = `${URL}verified/verify-user-by-admin`;
export const SECOND_CRYPTED = 600000;
export const SECOND_CRYPTED_IN_MINUTES = SECOND_CRYPTED / 60000

export function encryptSecretKey(User, user) {
    setTimeout( async () => {
        await User.updateOne({ email: user.email }, { secretKey: "******" });
    }, SECOND_CRYPTED);
}
