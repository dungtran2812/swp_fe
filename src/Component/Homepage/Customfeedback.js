import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FeedbackData } from '../../Shared/ListOfFeedback';
import { Box } from '@mui/material';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Customfeedback() {
  const [expandedMap, setExpandedMap] = React.useState({});

  const handleExpandClick = (index) => {
    setExpandedMap((prevExpandedMap) => ({
      ...prevExpandedMap,
      [index]: !prevExpandedMap[index],
    }));
  };

  return (
    <Box sx={{paddingBottom:5, paddingLeft:'10%', paddingRight:'10%', marginTop:10}}>
        <Typography variant='h4' textAlign='center' sx={{paddingBottom:5, fontWeight:'bold'}}> Phản Hồi Của Khách Hàng</Typography>
        <Box sx={{display:'flex', justifyContent:'center'}}>
            {FeedbackData.map((Feedback, index) => (
                <Card key={index} sx={{ maxWidth: 345 , marginRight:'3%'}}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                T
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={Feedback.customerName}
                        subheader="September 31, 2023"
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image="https://cdn-merchant.vinid.net/images/gallery/omre_trang_tin_tuc/1691393084_1.jpg"
                        alt="Apartment"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {Feedback.comment}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <ExpandMore
                            expand={expandedMap[index]}
                            onClick={() => handleExpandClick(index)}
                            aria-expanded={expandedMap[index]}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expandedMap[index]} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Design style:</Typography>
                            <Typography paragraph>
                                {Feedback.designStyle}
                            </Typography>
                            <Typography paragraph>
                                Total Cost:
                            </Typography>
                            <Typography paragraph>
                                {Feedback.totalCost}
                            </Typography>
                            <Typography>
                                Rating:
                            </Typography>
                            <Typography>
                                {Feedback.rating}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            ))}
        </Box>
    </Box>
  );
}
