export const isShopOpenNow = (openingHours) => {
    const today = new Date().toLocaleString("fr-FR", { weekday: "long" }).toLowerCase();
    const currentHour = new Date().getHours();

    const dayData = openingHours.find(day => day.day === today);

    if (!dayData || dayData.periods.length === 0) {
        return false;
    }

    for (const period of dayData.periods) {
        const startHour = parseInt(period.start.split(":")[0]);
        const endHour = parseInt(period.end.split(":")[0]);

        if (currentHour >= startHour && currentHour < endHour) {
            return true;
        }
    }

    return false;
};

export const formatOpeningHours = (openingHours) => {
    const formattedHours = openingHours.map(day => {
        const dayName = day.day.slice(0, 1).toUpperCase() + day.day.slice(1);
        if (day.periods.length === 0) {
            return `${dayName} : Fermé`;
        }

        const openingHours = day.periods.map(period => {
            return `${period.start} - ${period.end}`;
        });

        return `${dayName} : ${openingHours.join(', ')}`;
    });

    return formattedHours.join('\n');
};