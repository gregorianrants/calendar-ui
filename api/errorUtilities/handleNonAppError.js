import AppError from './AppError.js';
import GcalApiCallError from "./GcalApiError.js";

function handleValidationError(err, req, res, next) {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    const appError = new AppError(message, 400);
    return appError
}

function handleGcalApiError(err) {
    let message
    if (err?.response?.status === 400 && err?.response?.data?.error === "invalid_grant") {
        message = 'You are not authorized to access Google Calendar. You may have revoked access outside of VanCal. ' +
            'Try revoking authorization to Google Calendar from within VanCal then reauthorizing, this may fix the problem.' +
            'If not you may need to remove authorization to GoogleCalendar to continue using VanCal'
        return new AppError(message,401)
    }
    else {
        message ='there was a problem trying to access the google calendar api, ' +
            'if this problem persists you may want to remove authorization to google calendar ' +
            'to continue using the app, then try reauthorzing in the future'
        return new AppError(message,500)
    }
}

export default function handleNonAppError(err) {
    if (err instanceof GcalApiCallError) {
        return handleGcalApiError(err)
    }
    if (err.name === "ValidationError") {
        return handleValidationError(err)
    }
    return err
};
