function goToProfilePage(userId) {
    console.log(userId);
}

const data = () => ({
    columns: [
        {
            label: "Name",
            field: "name",
            width: 150,
            attributes: {
                "aria-controls": "DataTable",
                "aria-label": "Name"
            }
        },
        {
            label: "Email",
            field: "email",
            width: 270
        },
        {
            label: "Password",
            field: "password",
            width: 200
        },
        {
            label: "User Role",
            field: "userRole",
            width: 100
        },
        {
            label: "Faculty",
            field: "faculty",
            width: 100
        }
    ],
    rows: [
        {
            name: "Tiger Nixon",
            email: "System Architect",
            password: "Edinburgh",
            userRole: "61",
            faculty: "$320",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Garrett Winters",
            email: "Accountant",
            password: "Tokyo",
            userRole: "63",
            faculty: "$170",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Ashton Cox",
            email: "Junior Technical Author",
            password: "San Francisco",
            userRole: "66",
            faculty: "$86",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Cedric Kelly",
            email: "Senior Javascript Developer",
            password: "Edinburgh",
            userRole: "22",
            faculty: "$433",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Airi Satou",
            email: "Accountant",
            password: "Tokyo",
            userRole: "33",
            faculty: "$162",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Brielle Williamson",
            email: "Integration Specialist",
            password: "New York",
            userRole: "61",
            faculty: "$372",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Herrod Chandler",
            email: "Sales Assistant",
            password: "San Francisco",
            userRole: "59",
            faculty: "$137",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Rhona Davidson",
            email: "Integration Specialist",
            password: "Tokyo",
            userRole: "55",
            faculty: "$327",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Colleen Hurst",
            email: "Javascript Developer",
            password: "San Francisco",
            userRole: "39",
            faculty: "$205",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Sonya Frost",
            email: "Software Engineer",
            password: "Edinburgh",
            userRole: "23",
            faculty: "$103",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Jena Gaines",
            email: "Office Manager",
            password: "London",
            userRole: "30",
            faculty: "$90",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Quinn Flynn",
            email: "Support Lead",
            password: "Edinburgh",
            userRole: "22",
            faculty: "$342",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Charde Marshall",
            email: "Regional Director",
            password: "San Francisco",
            userRole: "36",
            faculty: "$470",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Haley Kennedy",
            email: "Senior Marketing Designer",
            password: "London",
            userRole: "43",
            faculty: "$313",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Tatyana Fitzpatrick",
            email: "Regional Director",
            password: "London",
            userRole: "19",
            faculty: "$385",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Michael Silva",
            email: "Marketing Designer",
            password: "London",
            userRole: "66",
            faculty: "$198",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Paul Byrd",
            email: "Chief Financial Officer (CFO)",
            password: "New York",
            userRole: "64",
            faculty: "$725",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Gloria Little",
            email: "Systems Administrator",
            password: "New York",
            userRole: "59",
            faculty: "$237",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Bradley Greer",
            email: "Software Engineer",
            password: "London",
            userRole: "41",
            faculty: "$132",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Dai Rios",
            email: "Personnel Lead",
            password: "Edinburgh",
            userRole: "35",
            faculty: "$217",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Jenette Caldwell",
            email: "Development Lead",
            password: "New York",
            userRole: "30",
            faculty: "$345",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Yuri Berry",
            email: "Chief Marketing Officer (CMO)",
            password: "New York",
            userRole: "40",
            faculty: "$675",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Caesar Vance",
            email: "Pre-Sales Support",
            password: "New York",
            userRole: "21",
            faculty: "$106",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Doris Wilder",
            email: "Sales Assistant",
            password: "Sidney",
            userRole: "23",
            faculty: "$85",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Angelica Ramos",
            email: "Chief Executive Officer (CEO)",
            password: "London",
            userRole: "47",
            faculty: "$1",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Gavin Joyce",
            email: "Developer",
            password: "Edinburgh",
            userRole: "42",
            faculty: "$92",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Jennifer Chang",
            email: "Regional Director",
            password: "Singapore",
            userRole: "28",
            faculty: "$357",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Brenden Wagner",
            email: "Software Engineer",
            password: "San Francisco",
            userRole: "28",
            faculty: "$206",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Fiona Green",
            email: "Chief Operating Officer (COO)",
            password: "San Francisco",
            userRole: "48",
            faculty: "$850",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Shou Itou",
            email: "Regional Marketing",
            password: "Tokyo",
            userRole: "20",
            faculty: "$163",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Michelle House",
            email: "Integration Specialist",
            password: "Sidney",
            userRole: "37",
            faculty: "$95",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Suki Burks",
            email: "Developer",
            password: "London",
            userRole: "53",
            faculty: "$114",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Prescott Bartlett",
            email: "Technical Author",
            password: "London",
            userRole: "27",
            faculty: "$145",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Gavin Cortez",
            email: "Team Leader",
            password: "San Francisco",
            userRole: "22",
            faculty: "$235",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Martena Mccray",
            email: "Post-Sales support",
            password: "Edinburgh",
            userRole: "46",
            faculty: "$324",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Unity Butler",
            email: "Marketing Designer",
            password: "San Francisco",
            userRole: "47",
            faculty: "$85",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Howard Hatfield",
            email: "Office Manager",
            password: "San Francisco",
            userRole: "51",
            faculty: "$164",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Hope Fuentes",
            email: "Secretary",
            password: "San Francisco",
            userRole: "41",
            faculty: "$109",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Vivian Harrell",
            email: "Financial Controller",
            password: "San Francisco",
            userRole: "62",
            faculty: "$452",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Timothy Mooney",
            email: "Office Manager",
            password: "London",
            userRole: "37",
            faculty: "$136",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Jackson Bradshaw",
            email: "Director",
            password: "New York",
            userRole: "65",
            faculty: "$645",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Olivia Liang",
            email: "Support Engineer",
            password: "Singapore",
            userRole: "64",
            faculty: "$234",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Bruno Nash",
            email: "Software Engineer",
            password: "London",
            userRole: "38",
            faculty: "$163",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Sakura Yamamoto",
            email: "Support Engineer",
            password: "Tokyo",
            userRole: "37",
            faculty: "$139",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Thor Walton",
            email: "Developer",
            password: "New York",
            userRole: "61",
            faculty: "$98",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Finn Camacho",
            email: "Support Engineer",
            password: "San Francisco",
            userRole: "47",
            faculty: "$87",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Serge Baldwin",
            email: "Data Coordinator",
            password: "Singapore",
            userRole: "64",
            faculty: "$138",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Zenaida Frank",
            email: "Software Engineer",
            password: "New York",
            userRole: "63",
            faculty: "$125",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Zorita Serrano",
            email: "Software Engineer",
            password: "San Francisco",
            userRole: "56",
            faculty: "$115",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Jennifer Acosta",
            email: "Junior Javascript Developer",
            password: "Edinburgh",
            userRole: "43",
            faculty: "$75",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Cara Stevens",
            email: "Sales Assistant",
            password: "New York",
            userRole: "46",
            faculty: "$145",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Hermione Butler",
            email: "Regional Director",
            password: "London",
            userRole: "47",
            faculty: "$356",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Lael Greer",
            email: "Systems Administrator",
            password: "London",
            userRole: "21",
            faculty: "$103",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Jonas Alexander",
            email: "Developer",
            password: "San Francisco",
            userRole: "30",
            faculty: "$86",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Shad Decker",
            email: "Regional Director",
            password: "Edinburgh",
            userRole: "51",
            faculty: "$183",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Michael Bruce",
            email: "Javascript Developer",
            password: "Singapore",
            userRole: "29",
            date: "2011/06/27",
            faculty: "$183",
            clickEvent: () => goToProfilePage(1)
        },
        {
            name: "Donna Snider",
            email: "Customer Support",
            password: "New York",
            userRole: "27",
            faculty: "$112",
            clickEvent: () => goToProfilePage(1)
        }
    ]
})

export default data;
