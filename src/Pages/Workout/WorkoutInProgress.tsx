import { useEffect, useState } from "react";

import { Workout } from "../../Models/Workout";
import WorkoutTable from "./WorkoutTable";
import WorkoutCompletedReport from "../Reports/WorkoutCompletedReport"

interface Props {
    workout?: Workout,
}

const WorkoutInProgress = (props: Props) => {
    const [seconds, setSeconds] = useState(0);
    const [timerRunning, setTimerRunning] = useState(true);
    const [workout, setWorkout] = useState(props.workout);
    const [showWorkoutCompletedReport, setShowWorkoutCompletedReport] = useState(false);
    const [showExerciseSearch, setShowExerciseSearch] = useState(false);

    useEffect(() => {
        if(timerRunning){
            const interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timerRunning]);

    const stopTimer = () => {
        setTimerRunning(false);
    };



    return(
        <>
            <div className={`container workout-in-progress-container ${showExerciseSearch ? 'unclickable' : ''}`} >
                <div className="header workout-in-progress-header">
                    <h2>Workout</h2>
                    <h2 className="timer">{new Date(seconds * 1000).toISOString().slice(11, 19)}</h2>
                    <button className="end-workout" onClick={() => {
                        setShowWorkoutCompletedReport(true);
                        stopTimer();
                        }
                    }>END</button>
                        
                </div>
                <div className="body">
                    <WorkoutTable existingWorkout={props.workout} setShowExerciseSearch={setShowExerciseSearch}/>
                </div>
            </div>
            <WorkoutCompletedReport
                            pr={null}
                            workout={props.workout}
                            exercises={null}
                            time={seconds}
                            trigger={showWorkoutCompletedReport}
                            setTrigger={setShowWorkoutCompletedReport}
                        />
        </>
    );

}

export default WorkoutInProgress;