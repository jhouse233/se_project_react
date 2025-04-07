import { createContext, useContext, useState } from 'react';

export const TemperatureContext = createContext({
    currentTemperatureUnit: "F",
    handleToggleSwitchChange: () => {}
});

export function TemperatureProvider({ children }) {
    const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

    const handleToggleSwitchChange = () => {
        console.log('Current unit before toggle:', currentTemperatureUnit);
        setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
        console.log('Switching to:', currentTemperatureUnit === "F" ? "C" : "F");
    };

    return (
        <TemperatureContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
            {children}
        </TemperatureContext.Provider>
    );
}

export function useTemperature() {
    const context = useContext(TemperatureContext);
    if (context === undefined) {
        throw new Error('useTemperature must be used within a TemperatureProvider')
    }
    return context;
}