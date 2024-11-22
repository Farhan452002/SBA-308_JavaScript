const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, ag, submissions) {
  try {
    // Validate course_id in AssignmentGroup
    if (ag.course_id !== course.id) {
      throw new Error(`Invalid data: AssignmentGroup does not belong to Course ID ${course.id}`);
    }

    // Filter assignments that are due
    const currentDate = new Date();
    const validAssignments = ag.assignments.filter(assignment => {
      const dueDate = new Date(assignment.due_at);
      return dueDate <= currentDate;
    });

    if (!validAssignments.length) {
      throw new Error("No assignments due for processing.");
    }

    // Search by Assignment ID using Object.fromEntries
    const assignmentMap = Object.fromEntries(
      validAssignments.map(assignment => [assignment.id, assignment])
    );


    
    // Process learner data
    const learnerResults = submissions.reduce((acc, submission) => {
      const { learner_id, assignment_id, submission: sub } = submission;

      if (!assignmentMap[assignment_id]) {
        return acc; // Ignore submissions for assignments that are not due
      }

      const assignment = assignmentMap[assignment_id];
      // Error Handling for Possible Points 
      if (typeof assignment.points_possible !== "number" || assignment.points_possible <= 0) {
        throw new Error(`Invalid points_possible for assignment ID ${assignment_id}`);
      }

      const dueDate = new Date(assignment.due_at);
      const submittedDate = new Date(sub.submitted_at);
      const isLate = submittedDate > dueDate;
      const adjustedScore = isLate ? Math.max(0, sub.score - 0.1 * assignment.points_possible) : sub.score;
      const percentage = adjustedScore / assignment.points_possible;
      // If the Accumilator does not have the current ID. Then use placeholder values 
      if (!acc[learner_id]) {
        acc[learner_id] = { id: learner_id, avg: 0, totalPoints: 0, totalPossible: 0 };
      }
      // Input Values
      acc[learner_id][assignment_id] = parseFloat((percentage * 100).toFixed(2));
      acc[learner_id].totalPoints += adjustedScore;
      acc[learner_id].totalPossible += assignment.points_possible;

      return acc;
    }, {});
  // Compute average scores
  return Object.values(learnerResults).map(learner => {
    learner.avg = parseFloat(((learner.totalPoints / learner.totalPossible) * 100).toFixed(2));
    delete learner.totalPoints;
    delete learner.totalPossible;
    return learner;
});
} catch (error) {
console.error("Error processing learner data:", error.message);
return [];
}
   
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);
