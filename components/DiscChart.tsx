
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { DiscResults } from '../types';

interface Props {
  results: DiscResults;
}

const DiscChart: React.FC<Props> = ({ results }) => {
  const data = [
    { subject: 'D', fullSubject: 'Dominance', value: results.D, fullMark: 10 },
    { subject: 'I', fullSubject: 'Ietekme', value: results.I, fullMark: 10 },
    { subject: 'S', fullSubject: 'Stabilitāte', value: results.S, fullMark: 10 },
    { subject: 'C', fullSubject: 'Analītika', value: results.C, fullMark: 10 },
  ];

  return (
    <div className="w-full h-[280px] sm:h-[350px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis 
            dataKey="fullSubject" 
            tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
          <Radar
            name="Profils"
            dataKey="value"
            stroke="#0d9488"
            fill="#0d9488"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiscChart;
