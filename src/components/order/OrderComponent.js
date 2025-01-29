import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AddressForm } from "./AddressForm";
import { ShippingForm } from "./ShippingForm";
import { PaymentForm } from "./PaymentForm";
import { useParams } from "react-router-dom";
import { PaymentCartForm } from "./PaymentCartForm";
import styles from "../../styles/Order.module.css";

const steps = ["Select Address", "Shipping", "Payment"];

export default function OrderComponent() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [addressFormState, setAddressFormState] = React.useState(false);
  const [ShippingState, setShippingState] = React.useState(false);

  const { id } = useParams();

  const handlefunction = (data) => {
    setAddressFormState(data);
  };

  const handlefunction1 = (data) => {
    setShippingState(data);
  };
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box className={styles.OrderComponentParent}>
      <Stepper
        nonLinear
        activeStep={activeStep}
        sx={{ width: { xs: "100%", md: "70%" }, mb: 5 }}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit">{label}</StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <AddressForm handlefunction={handlefunction} />
            )}
            {activeStep === 1 && (
              <ShippingForm handlefunction1={handlefunction1} />
            )}
            {activeStep === 2 ? (
              id !== "bike-order-cart" ? (
                <PaymentForm />
              ) : (
                <PaymentCartForm />
              )
            ) : null}

            <Box className={styles.nextBtn}>
              <Box className={styles.nextBtnChild} />
              <Button
                onClick={handleNext}
                className={styles.activeStep}
                sx={{
                  display: activeStep === 2 ? "none" : "inherit",
                }}
                disabled={
                  activeStep === 0
                    ? !addressFormState
                    : activeStep === 1
                    ? !ShippingState
                    : true
                }
              >
                Next
              </Button>
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
