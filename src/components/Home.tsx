import { Box, Grid } from "@mui/material";
import OverlayImage from "./OverlayImage";
import PromoCard from "./PromoCard";
import NavbarHome from "./NavbarHome";

const Home = () => {
     const promos = [ { title: 'Cuenta de Ahorros Premium', description: 'Disfruta de tasas de interés competitivas y acceso a nuestro asesoramiento financiero personalizado.', bgColor: '#FF6F61', }, { title: 'Préstamos Express', description: 'Obtén tu préstamo aprobado en menos de 24 horas. Sin papeleo complicado.', bgColor: '#4A90E2', }, { title: 'Seguimiento en Tiempo Real', description: 'Controla tus ahorros y préstamos en tiempo real con nuestra aplicación móvil.', bgColor: '#7ED321', }, { title: 'Ahorro para tus Sueños', description: 'Empieza a ahorrar hoy y haz realidad tus sueños mañana. ¡Te ayudamos a planificar!', bgColor: '#F8E71C', }, { title: 'Préstamos a Medida', description: 'Préstamos personalizados según tus necesidades. Flexibilidad en plazos y montos.', bgColor: '#BD10E0', }, { title: 'Ahorro sin Límites', description: 'Crea múltiples cuentas de ahorro para diferentes objetivos. ¡Organiza y crece tu dinero!', bgColor: '#9013FE', }, { title: 'Consulta tu Crédito Fácil', description: 'Revisa el estado de tu préstamo desde cualquier lugar, en cualquier momento.', bgColor: '#50E3C2', }, { title: 'Plan de Ahorro Familiar', description: 'Inicia un plan de ahorro para toda la familia y asegura tu futuro financiero.', bgColor: '#B8E986', }, ];

    return (
        <div>
            <NavbarHome></NavbarHome>
             <OverlayImage />
             <Box sx={{ padding: '20px' }}>
                <Grid container spacing={2}>
                    {promos.map((promo, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <PromoCard title={promo.title} description={promo.description} bgColor={promo.bgColor} />
                    </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};

export default Home;
