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

  }
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);
