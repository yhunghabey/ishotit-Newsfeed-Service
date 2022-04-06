import Jwt from "jsonwebtoken";

export function guard() {
    return async (req, res, next) => {
        let token = req.headers.authorization;
        if (!token)
          throw new InvalidTokenError(
            "Kindly provide valid authentication token"
          );
        token = token.split(" ").pop();
        const tokenRef = Jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err){
                return res.json({ message: err });
            }else {
                req.user = user;
                next();
            }
        });
    }
}