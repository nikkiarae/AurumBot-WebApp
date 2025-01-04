import React from "react"
import { Box, Button, Container, Typography, Grid, Paper } from '@mui/material';

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #f5c842, #fff)',
        textAlign: 'center',
      }}
    >
      {/* Hero Section */}
      <Container maxWidth="md">
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            color: '#333',
          }}
        >
          Welcome to <span style={{ color: '#f5c842' }}>AurumBot</span>
        </Typography>
        <Typography variant="h6" sx={{ mb: 5, color: '#555' }}>
          Your gateway to discovering the next big thing in crypto.
        </Typography>

        {/* Call-to-Action */}
        <Button
          href="https://t.me/YourTelegramBot"
          target="_blank"
          variant="contained"
          sx={{
            backgroundColor: '#f5c842',
            color: '#fff',
            padding: '10px 20px',
            fontSize: '1.2rem',
            borderRadius: '50px',
            '&:hover': {
              backgroundColor: '#e5b73a',
            },
          }}
        >
          Launch AurumBot
        </Button>
      </Container>

      {/* Pricing Section */}
      <Box
        sx={{
          mt: 10,
          py: 5,
          width: '100%',
          backgroundColor: '#fff',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            Subscription Plans
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  textAlign: 'center',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Basic
                </Typography>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  $10 / month
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  Get access to real-time alerts for new and boosted tokens.
                </Typography>
                <Button
                  href="https://t.me/YourTelegramBot"
                  target="_blank"
                  variant="contained"
                  sx={{
                    backgroundColor: '#f5c842',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#e5b73a',
                    },
                  }}
                >
                  Subscribe Now
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  textAlign: 'center',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Premium
                </Typography>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  $25 / month
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  Exclusive access to golden and insider token alerts.
                </Typography>
                <Button
                  href="https://t.me/YourTelegramBot"
                  target="_blank"
                  variant="contained"
                  sx={{
                    backgroundColor: '#f5c842',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#e5b73a',
                    },
                  }}
                >
                  Subscribe Now
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
