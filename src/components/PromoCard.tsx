import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PromoCardProps from '../interfaces/PromoCardHome';

const PromoCard: React.FC<PromoCardProps> = ({
  title,
  description,
  bgColor,
}) => {
  return (
    <Card
      sx={{
        backgroundColor: bgColor,
        color: 'white',
        margin: '20px',
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default PromoCard;
