export function getRandomChartColorObject() {
    // Generate a random color
    const r = Math.floor(Math.random() * 200) + 30;
    const g = Math.floor(Math.random() * 200) + 30;
    const b = Math.floor(Math.random() * 200) + 30;
    const hex = (v: number) => v.toString(16).padStart(2, '0');
    const rgb = `rgba(${r},${g},${b},0.85)`;
    const border = `#${hex(r)}${hex(g)}${hex(b)}`;

    return {
        backgroundColor: rgb,
        borderColor: border,
        pointBackgroundColor: border,
        pointBorderColor: '#fff'
    };
}