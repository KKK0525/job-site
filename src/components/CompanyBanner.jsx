import { Link } from "react-router-dom";
import icon from "assets/recommand.png";
import introduce from "assets/introduce.png";
import cooperate from "assets/coop.png";
import { userType } from "libs/isAuth";
import { Button } from '@mui/material'

export function CompanyBanner() {
  const type = userType();
  return (
    <>
      {type === "recruiter" ? (
        <>
          <div className="md:w-10/12 w-11/12 flex flex-wrap mx-auto">
            <div className="text-left lg:w-5/12 w-12/12 lg:pt-24 pt-12 pb-20 mx-auto">
              <h1 className="text-gray-800 lg:text-6xl text-4xl font-bold  sm:mx-auto lg:mx-0 mb-4">
                We help you help your friends
              </h1>

              <p className="text-xl text-black">
                Anyone can refer a friend on Greet. But if you are serious about
                helping your friends, you should sign up for a Greeter account.
                A Greeter account let's you track the progress of your referrals
                and makes it faster to fill in a referral.
              </p>

              <div className="flex items-center pt-10 ">
                <Link
                  to="/for-applicant"
                  className="ml-4 font-semibold mr-2 cursor-pointer border-b-2 border-black bg-gray-50  hover:bg-gray-200   px-3 py-3 rounded-xl border-none"
                >
                   <Button variant="contained" size="large">Read more</Button>
                </Link>
              </div>
            </div>

            <div className="md:w-7/12 w-12/12 md:block hidden md:pt-20  md:pl-10 mx-auto">
              <img
                className=" mt-0 w-3/5 lg:float-center float-none mx-auto rounded-3xl"
                src={introduce}
                alt="company"
              />
            </div>
          </div>

          <div className="md:w-10/12 w-9/12 flex flex-row mx-auto">
            <div className="md:w-7/12 w-9/12 md:block hidden flex md:pt-20 pb-20 mx-auto">
              <img
                className=" mt-0 w-2/5 rounded-3xl lg:float-center float-none mx-auto"
                src={icon}
                alt="company"
              />
            </div>
            <div className="text-left lg:w-5/12 w-12/12 lg:pt-24 pt-12 pb-20 mx-auto">
              <h1 className="text-gray-800 lg:text-6xl text-4xl font-bold  sm:mx-auto lg:mx-0 mb-4">
                Not sure where to refer your friend?
              </h1>

              <p className="text-xl text-black">
                Don't worry! By submitting a wild card, you submit your friend
                to a pool of talents that companies can pick from. And yes, of
                course you get paid if your referral results in an interview or
                hire.
              </p>

              <div className="flex items-center pt-10">
                <Link
                  to="/sign-up"
                >
                  <Button variant="contained" size="large">Submit a wild card</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="md:w-10/12 w-11/12 flex flex-wrap mx-auto">
            <div className="text-center w-12/12 pt-12 pb-20 mx-auto">
              <div className="md:w-9/12 w-12/12 mx-auto">
                <h1 className="text-gray-800 lg:text-6xl text-4xl font-bold  sm:mx-auto lg:mx-0 mb-4">
                  We help tech companies reach their full potential
                </h1>

                <p className="text-xl text-black">
                  Post jobs for free and decide for yourself how much you are
                  willing to pay for an interview or a hire. Make your
                  recruitment process crowdsourced and remove expensive
                  headhunters from the equation.
                </p>
              </div>

              <div className="flex justify-center mt-10 gap-3">
                <Link
                  to="/create-new-job"
                >
                  <Button variant="contained" size="large">Request a demo</Button>
                </Link>

                <Link
                  to="/for-recruiter"
                >
                  <Button variant="outlined" size="large">Read more</Button>
                  
                </Link>
              </div>

              <div className="md:w-5/12  mx-auto">
                <img
                  className="w-full rounded-3xl mt-3"
                  src={cooperate}
                  alt="company"
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
