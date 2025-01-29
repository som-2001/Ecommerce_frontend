import { Box, Step, StepLabel, Stepper } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CancelIcon from "@mui/icons-material/Cancel";
import styles from "../../styles/Order.module.css";

const steps = [
  { label: "Ordered", icon: ShoppingCartIcon },
  { label: "Shipped", icon: LocalShippingIcon },
  { label: "Delivered", icon: CheckCircleIcon },
  { label: "Cancelled", icon: CancelIcon },
];

export const OrderTracker = ({ status }) => {
  const activeStep = steps.findIndex((step) =>
    step.label.toLowerCase() === status?.toLowerCase()
  );

  return (
    <Box sx={{ width: "100%", mt: 2, }}>
      <Stepper activeStep={activeStep >= 0 ? activeStep : 0} alternativeLabel>
        {steps.map((step, index) => {
          const StepIcon = step.icon;

          return (
            <Step key={step.label} className={styles.orderTrackerParent}>
              <StepLabel
                StepIconComponent={() => (
                  <StepIcon
                    style={{
                      color: index <= activeStep ? "#64b5f6" : "#d3d3d3",
                    }}
                  />
                )}
                sx={{
                  "& .MuiStepLabel-label": {
                    color:
                      index <= activeStep
                        ? "primary.main"
                        : "text.secondary",
                    fontWeight: index === activeStep ? "bold" : "normal",
                  },
                  fontSize:{xs:"11px",sm:"20px"}
                }}
              >
                {step.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};
