import * as React from "react";

// reCAPTCHA disabled: All recaptcha functionality removed
export function useRecaptcha() {
    return React.useCallback(
        async () => {
            // Return null to indicate reCAPTCHA is disabled
            return null;
        },
        [],
    );
}
