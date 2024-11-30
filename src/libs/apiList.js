export const server = `http://localhost:5000/api`;

const apiList = {
  login: `${server}/auth/login`,
  signup: `${server}/auth/signup`,
  forgot: `${server}/auth/password/forgot`,
  reset: `${server}/auth/password/reset`,
  uploadResume: `${server}/uploadResume/resume`,
  downloadResume: `${server}/download/resume`,
  uploadProfile: `${server}/upload/profile`,
  jobs: `${server}/jobs`,
  updateJob: `${server}/jobs/:id`,
  jobsId: `${server}/jobs/`,
  getJobCategory:`${server}/jobs/get/getJobCategory`,
  applications: `${server}/applications`,
  resumeApplications: `${server}/applications/resume`,
  updateApplications: `${server}/applications/:id`,
  rating: `${server}/rating`,
  updateUser: `${server}/user`,
  deleteUser: `${server}/user/deleteUser/:id`,
  user: `${server}/user`,
  users: `${server}/user/all`,
  userId: `${server}/user/:id`,
  applicants: `${server}/applicants`,
  OTP: `${server}/auth/verify_otp`,
  allApplicants: `${server}/user/allApplicant`,
  allRecruiter: `${server}/user/allRecruiter`,
  getIdRecruiter: `${server}/user/allRecruiter/:id`,
  google: `${server}/auth/google`,
  verifyPayment:`${server}/payment/verifypayment`,
  payment: `${server}/payment/createOrder`,
};
 
export default apiList;
