import axios from "axios";
import apiList from "libs/apiList";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';

export default function Recruiter(props) {

  const { recruiter } = props;
  const [jobs, setJobs] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let address = apiList.jobs;
        const response = await axios.get(`${address}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setJobs(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobs();
  }, []);

  const handleReadMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

  const filteredReferrals = jobs.filter(
    (obj) => obj.userId === recruiter.userId
  );
  //console.log("filteredReferrals: ", filteredReferrals);

  return (
    <>
      {recruiter ? (
        <div className="">
          <Card sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' }}>
            <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
              <span className="absolute top-0 right-0 flex justify-center items-center gap-2 mr-2 mt-2 p-2">
                <div className="w-6 h-6 bg-blue-100 shadow-inner flex justify-center items-center rounded-3xl">
                  <div className="w-4 h-4 rounded-3xl bg-blue-200 shadow-inner flex justify-center items-center">
                    <div className="w-2 h-2 rounded-3xl bg-blue-300 shadow-inner"></div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-400">
                  {filteredReferrals.length} Jobs
                </span>
              </span>
              <Avatar src={recruiter.profile} sx={{ '--Avatar-size': '4rem', marginTop: '25px' }} />
              <Chip
                size="sm"
                variant="soft"
                color="primary"
                sx={{
                  mt: -1,
                  mb: 1,
                  border: '3px solid',
                  borderColor: 'background.surface',
                }}
              >
              Recruiter                
              </Chip>
              <Typography level="title-lg">{recruiter.name}</Typography>
              <Link to={`/companies/${recruiter.userId}`}>
                <Button variant="soft" fullWidth>Read More</Button>
              </Link>
              <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
                {recruiter && recruiter.banner ? (
                  <>
                    {isExpanded ? (
                      <span className="text-sm text-gray-600 font-semibold">
                        {recruiter.banner}
                      </span>
                    ) : (
                      <span className="text-sm font-bold text-gray-600 font-semibold">
                        {recruiter.banner.slice(0, 20) + "..."}
                      </span>
                    )}
                    <span
                      className="text-blue-500 text-xs hover:opacity-60 ease-in-out duration-150 cursor-pointer ml-1"
                      onClick={handleReadMoreClick}
                    >
                      {isExpanded ? "Read less" : "Read more"}
                    </span>
                  </>
                ) : (
                  <div className="pb-4">
                    <span className="font-bold text-sm text-gray-400">
                      Banner is not available!
                    </span>
                  </div>
                )}
              </Typography>
            </CardContent>

          </Card>

        </div>
      ) : null}
    </>
  );
}

