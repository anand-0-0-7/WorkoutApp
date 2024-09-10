import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

function WorkoutEntryForm() {
    const [date, setDate] = useState('');
    const [workoutType, setWorkoutType] = useState('');
    const [setNo, setSetNo] = useState('');
    const [reps, setReps] = useState('');
    const [workoutTypes, setWorkoutTypes] = useState([]); 
    const [workoutNames, setWorkoutNames] = useState([]); // Will hold { id, name } tuples
    const [selectedWorkoutId, setSelectedWorkoutId] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/workouts/workouttypes')
            .then(response => {
                const types = Array.isArray(response.data) ? response.data : [];
                setWorkoutTypes(types);
            })
            .catch(error => {
                console.error('Error fetching workout types:', error);
                setWorkoutTypes([]);
            });
    }, []);

    useEffect(() => {
        if (workoutType) {
            axios.get(`http://localhost:5000/api/workouts/workoutnames/${workoutType}`)
                .then(response => {
                    const names = Array.isArray(response.data) ? response.data : [];
                    setWorkoutNames(names);
                })
                .catch(error => {
                    console.error('Error fetching workout names:', error);
                    setWorkoutNames([]);
                });
        }
    }, [workoutType]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Retrieve the UserId from sessionStorage
        const UserId = sessionStorage.getItem('UserId');
        if (!UserId) {
            console.error('UserId not found in session storage. Please log in again.');
            return;
        }

        const workoutLog = { date, workoutId:selectedWorkoutId, setNo, reps, UserId };

        axios.post('http://localhost:5000/api/workouts/logworkout', workoutLog)
            .then(response => {
                console.log('Workout logged successfully:', response.data);
                setDate('');
                setWorkoutType('');
                setSelectedWorkoutId('');
                setSetNo('');
                setReps('');
            })
            .catch(error => console.error('Error saving workout log:', error));
    };

    const handleWorkoutNameChange = (e) => {
        setSelectedWorkoutId(e.target.value); // Directly set the value
    }; 

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit} className="row g-3">
                {/* Date Field */}
                <div className="col-md-6">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-control border-primary"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                {/* Workout Type Dropdown */}
                <div className="col-md-6">
                    <label htmlFor="workoutType" className="form-label">Workout Type</label>
                    <select
                        className="form-select border-primary"
                        id="workoutType"
                        value={workoutType}
                        onChange={(e) => setWorkoutType(e.target.value)}
                        required
                    >
                        <option value="">Select Workout Type</option>
                        {workoutTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                {/* Workout Name Dropdown */}
                <div className="col-md-6">
                    <label htmlFor="workoutName" className="form-label">Workout Name</label>
                    <select
                        className="form-select border-primary"
                        id="workoutName"
                        value={selectedWorkoutId}
                        onChange={handleWorkoutNameChange}
                        required
                    >
                         <option value="">Select Workout Name</option>
                        {workoutNames.map((workout) => (
                            <option key={workout.workoutId} value={workout.workoutId}>
                                {workout.workoutName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Set No Field */}
                <div className="col-md-3">
                    <label htmlFor="setNo" className="form-label">Set No</label>
                    <input
                        type="number"
                        className="form-control border-primary"
                        id="setNo"
                        value={setNo}
                        onChange={(e) => setSetNo(e.target.value)}
                        required
                    />
                </div>

                {/* Reps Completed Field */}
                <div className="col-md-3">
                    <label htmlFor="reps" className="form-label">Reps Completed</label>
                    <input
                        type="number"
                        className="form-control border-primary"
                        id="reps"
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="col-12 text-center mt-3">
                    <button type="submit" className="btn btn-primary">Save Workout Log</button>
                </div>
            </form>
        </div>
    );
}

export default WorkoutEntryForm;
