"use client";
import React, { useEffect, useState } from "react";

const SkillsCloud = ({ skills }) => {
    const [maxTotal, setMaxTotal] = useState(0);

    useEffect(() => {
        setMaxTotal(Math.max(...skills.map((skill) => skill.total)));
    }, [skills]);

    const getFontSizeClass = (total) => {
        const ratio = total / maxTotal;
        if (ratio > 0.8) return "text-2xl";
        if (ratio > 0.6) return "text-xl";
        if (ratio > 0.4) return "text-lg";
        if (ratio > 0.2) return "text-md";
        return "text-sm";
    };

    return (
        <div className="flex justify-center flex-wrap align-center gap-2 text-pretty">
            {skills.map((skill, index) => (
                <span key={index} className={`m-0 p-0 leading-5 ${getFontSizeClass(skill.total)}`}>
                    {skill.skill}
                </span>
            ))}
        </div>
    );
};

export default SkillsCloud;