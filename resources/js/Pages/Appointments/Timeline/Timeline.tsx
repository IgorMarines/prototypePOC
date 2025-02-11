import { FC, useState, useEffect } from "react";
import { Badge } from "@/Components/ui/badge";
import { Appointment } from "../../Patients/types";
import { format } from "date-fns";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { statusMap, translateStatus } from "@/utils/status";
import { styled } from "@mui/material/styles";

interface TimelineProps {
    appointment: Appointment;
}

const Timeline: FC<TimelineProps> = ({ appointment }) => {
    const [color, setColor] = useState("#00bcd4");

    useEffect(() => {
        if (appointment.status === 'canceled' || appointment.status === 'interrupted') {
            setColor("red");
        } else {
            setColor("#00bcd4");
        }
    }, [appointment.status]);

    const getActiveStep = (status: string) => {
        if (status === "completed") {
            return statusMap.length;
        }
        const activeStep = statusMap.findIndex((procedure) => {
            return procedure.value === status;
        });
        return activeStep !== -1 ? activeStep + 1 : 0;
    };

    const activeStep = getActiveStep(appointment.status);
    const isError = appointment.status === 'canceled' || appointment.status === 'interrupted';

    // Custom Stepper styles
    const QontoConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 10,
            left: 'calc(-50% + 16px)',
            right: 'calc(50% + 16px)',
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: color, // Active color
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: color, // Completed color
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#eaeaf0', // Default color
            borderTopWidth: 3,
            borderRadius: 1,
            ...theme.applyStyles('dark', {
                borderColor: theme.palette.grey[800],
            }),
        },
    }));

    const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean, error?: boolean } }>(
        ({ theme, ownerState }) => ({
            color: ownerState.active ? color : ownerState.error ? 'red' : '#eaeaf0',
            display: 'flex',
            height: 22,
            alignItems: 'center',
            '& .QontoStepIcon-completedIcon': {
                color: color,
                zIndex: 1,
                fontSize: 18,
            },
            '& .QontoStepIcon-errorIcon': {
                color: 'red',
                zIndex: 1,
                fontSize: 18,
            },
            '& .QontoStepIcon-circle': {
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'currentColor',
            },
            ...theme.applyStyles('dark', {
                color: theme.palette.grey[700],
            }),
        }),
    );

    function QontoStepIcon(props: StepIconProps & { error?: boolean }) {
        const { active, completed, error, className } = props;

        return (
            <QontoStepIconRoot ownerState={{ active, error }} className={className}>
                {completed ? (
                    <Check className="QontoStepIcon-completedIcon" />
                ) : error ? (
                    <ErrorIcon className="QontoStepIcon-errorIcon" />
                ) : (
                    <div className="QontoStepIcon-circle" />
                )}
            </QontoStepIconRoot>
        );
    }

    return (
        <div className="timeline">
            <h2 className="text-xl font-semibold mb-4">Linha do Tempo de Procedimentos</h2>
            {isError && (
                <div className="text-red-500 mb-4">
                    {appointment.status === 'canceled' ? "Este procedimento foi cancelado." : "Este procedimento foi interrompido."}
                </div>
            )}
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
                    {statusMap.map((procedure, index) => {
                        const isCompleted = appointment.status === "completed" || index < activeStep;
                        const showError = isError && index >= activeStep;
                        return (
                            <Step key={procedure.value}>
                                <StepLabel StepIconComponent={(props) => <QontoStepIcon {...props} completed={isCompleted} error={showError} />}>
                                    {translateStatus(procedure.value)}
                                </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Box>
        </div>
    );
};

export default Timeline;