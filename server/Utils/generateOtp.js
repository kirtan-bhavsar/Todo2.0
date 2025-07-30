import otpGenerator from "otp-generator";

const generateOtp = async (email) => {
  const otp = otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  console.log(otp);
  console.log("otp");
  console.log("otp");
  return otp;
};

export default generateOtp;
