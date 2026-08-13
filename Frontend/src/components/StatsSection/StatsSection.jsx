import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './StatsSection.css';

const STATS = [
  { value: 500, suffix: '+', label: 'Projects Delivered' },
  { value: 50, suffix: '+', label: 'Cities Covered' },
  { value: 24, suffix: '/7', label: 'Support Available' },
  { value: 15, suffix: '+', label: 'Years Experience' }
];

const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / value));
      
      const timer = setInterval(() => {
        start += Math.ceil(value / 50) || 1;
        if (start > value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [value, isInView]);

  return (
    <span ref={ref} className="stats__number">
      {count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="stats-section">
      <div className="container stats__grid">
        {STATS.map((stat, index) => (
          <motion.div 
            key={index}
            className="stats__item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Counter value={stat.value} suffix={stat.suffix} />
            <span className="stats__label">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
