import * as jwt from 'jsonwebtoken';

export const  generateAccessToken = (username) =>
jwt.sign({username}, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
});  

export const generateRefreshToken = (username) => 
    jwt.sign({refresh: true, username}, process.env.TOKEN_SECRET, {
        expiresIn: "14d",
});


export const generateTokens = (username) => ({
    accessToken: generateAccessToken(username),
    refreshToken: generateRefreshToken(username)
})