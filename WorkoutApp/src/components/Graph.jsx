import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './Graph.css';

// Register the components required for Line chart
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Graph = () => {
    const [workoutData, setWorkoutData] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState('');
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        const userId = parseInt(sessionStorage.getItem('UserId'), 10);

        // Fetch unique WorkoutName and SetNo combinations from the backend using axios
        axios.get(`http://localhost:5000/api/graph/workout-log-options?userId=${userId}`)
            .then(response => {
                setWorkoutData(response.data); // Expecting [{workoutName, setNo}, ...]
            })
            .catch(error => {
                console.error('Error fetching workout log options:', error);
            });
    }, []);

    const handleWorkoutChange = (e) => {
        const selected = e.target.value;
        setSelectedWorkout(selected);
        const userId = parseInt(sessionStorage.getItem('UserId'), 10);

        // Fetch graph data for the selected workout using axios
        axios.get(`http://localhost:5000/api/graph/workout-data`, {
            params: {
                userId,
                workoutName: selected.split(",")[0],
                setNo: selected.split(",")[1]
            }
        })
            .then(response => {
                setGraphData(response.data); // Expecting [{date, reps}, ...]
            })
            .catch(error => {
                console.error('Error fetching workout data:', error);
            });
    };

    const renderGraph = () => {
        if (!graphData) return null;

        const labels = graphData.map(item => item.date);
        const repsData = graphData.map(item => item.reps);

        const chartData = {
            labels: labels,
            datasets: [{
                label: 'Reps over time',
                data: repsData,
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            }]
        };

        const options = {
            maintainAspectRatio: false, // Allows custom width and height
        };
    
        return (
            <div style={{ width: '75vw', height: '55vh' }}> {/* Customize size here */}
                <Line data={chartData} options={options} width={800} height={400} /> {/* Set width and height */}
            </div>
        );
    };

    return (
        <div>
            <h2>Workout Progress</h2>
            <select onChange={handleWorkoutChange}>
                <option value="">Select Workout Name and Set No</option>
                {workoutData.map(({ workoutName, setNo }) => (
                    <option key={`${workoutName}-${setNo}`} value={`${workoutName},${setNo}`}>
                        {`${workoutName} - Set ${setNo}`}
                    </option>
                ))}
            </select>
            {renderGraph()}
        </div>
    );
};

export default Graph;
