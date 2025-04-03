// South Korea Market Data
const southKoreaData = {
    impressions: {
        '2024': [0, 0, 0, 17214486, 11990065, 16588713, 8647191, 16541289, 9319673, 12179307, 30408712, 28404259],
        '2025': [19681385, 12027513, 25195864, 15823513, 39481208, 63138904, 38298120, 38298120, 7937615, 12379745, 56125553, 42900174]
    },
    travelQueries: {
        '2023': [0.480519481, 0.371310508, 0.753246753, 0.925619835, 0.845336482, 0.78866588, 0.904958678, 1.106257379, 1.037190083, 1.584415584, 1.449232586, 1.310507674],
        '2024': [1.586186541, 1.43270366, 1.404958678, 1.349468713, 1.54309327, 1.497638725, 1.579693034, 1.52420307, 1.648170012, 2.048996458, 1.515348288, 1.587367178],
        '2025': {
            'moderate': [1.4144, 1.5543, 2.19, 1.87, 2.47, 2.14, 2.66, 2.52, 2.96, 4.09, 2.19, 2.63],
            'conservative': [1.4144, 1.5543, 1.99, 1.73, 2.28, 2.02, 2.44, 2.30, 2.70, 3.85, 2.07, 2.43],
            'ambitious': [1.4144, 1.5543, 2.41, 2.01, 2.67, 2.26, 2.90, 2.76, 3.24, 4.35, 2.31, 2.85]
        }
    },
    flightSearches: {
        '2023': [412, 366, 186, 305, 247, 315, 275, 313, 439, 528, 572, 559],
        '2024': [824, 635, 513, 568, 495, 315, 633, 785, 1119, 704, 615, 1159]
    },
    hotelGuests: {
        '2023': [2989, 1963, 1785, 1294, 1456, 1164, 1179, 1286, 1951, 2004, 1943, 2713],
        '2024': [2715, 2914, 2284, 3030, 3321, 2129, 2312, 2445, 3157, 3875, 2931, 3941]
    }
};

// Months labels
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Chart instances
let queriesChart, impressionsChart, flightsChart, hotelChart;

// Chart configuration
const chartConfig = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false
    },
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                usePointStyle: true,
                padding: 15,
                font: {
                    family: "'Inter', sans-serif",
                    size: 12
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: {
                family: "'Inter', sans-serif",
                weight: 'bold',
                size: 13
            },
            bodyFont: {
                family: "'Inter', sans-serif",
                size: 13
            },
            padding: 12,
            cornerRadius: 8,
            displayColors: true,
            usePointStyle: true,
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        if (context.parsed.y > 1000000) {
                            label += (context.parsed.y / 1000000).toFixed(1) + 'M';
                        } else if (context.parsed.y > 1000) {
                            label += (context.parsed.y / 1000).toFixed(1) + 'K';
                        } else {
                            label += context.parsed.y.toLocaleString();
                        }
                    }
                    return label;
                }
            }
        }
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
                font: {
                    family: "'Inter', sans-serif",
                    size: 12
                }
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
                font: {
                    family: "'Inter', sans-serif",
                    size: 12
                }
            }
        }
    },
    elements: {
        line: {
            tension: 0.3
        },
        point: {
            radius: 3,
            hoverRadius: 6
        }
    },
    animation: {
        duration: 1000,
        easing: 'easeOutQuart'
    }
};

// Initialize charts
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    setupTabSwitching();
    setupScenarioButtons();
    setupPrintButton();
});

function initCharts() {
    // Travel Queries Chart
    const queriesCtx = document.getElementById('queries-chart').getContext('2d');
    queriesChart = new Chart(queriesCtx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: '2024 Actual',
                    data: southKoreaData.travelQueries['2024'],
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: '2025 Moderate',
                    data: southKoreaData.travelQueries['2025']['moderate'],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            ...chartConfig,
            plugins: {
                ...chartConfig.plugins,
                title: {
                    display: true,
                    text: 'South Korea Travel Queries Forecast',
                    font: {
                        family: "'Inter', sans-serif",
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                }
            },
            scales: {
                ...chartConfig.scales,
                y: {
                    ...chartConfig.scales.y,
                    title: {
                        display: true,
                        text: 'Travel Queries Index',
                        font: {
                            family: "'Inter', sans-serif",
                            weight: 'bold',
                            size: 13
                        }
                    }
                },
                x: {
                    ...chartConfig.scales.x,
                    title: {
                        display: true,
                        text: 'Month',
                        font: {
                            family: "'Inter', sans-serif",
                            weight: 'bold',
                            size: 13
                        }
                    }
                }
            }
        }
    });
    
    // Impressions Chart
    const impressionsCtx = document.getElementById('impressions-chart').getContext('2d');
    impressionsChart = new Chart(impressionsCtx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: '2024',
                    data: southKoreaData.impressions['2024'],
                    borderColor: 'rgba(255, 206, 86, 1)',
                    backgroundColor: 'rgba(255, 206, 86, 0.1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: '2025 (Planned)',
                    data: southKoreaData.impressions['2025'],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            ...chartConfig,
            plugins: {
                ...chartConfig.plugins,
                title: {
                    display: true,
                    text: 'South Korea Media Impressions',
                    font: {
                        family: "'Inter', sans-serif",
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                }
            },
            scales: {
                ...chartConfig.scales,
                y: {
                    ...chartConfig.scales.y,
                    title: {
                        display: true,
                        text: 'Impressions',
                        font: {
                            family: "'Inter', sans-serif",
                            weight: 'bold',
                            size: 13
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
                            if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
                            return value;
                        }
                    }
                },
                x: {
                    ...chartConfig.scales.x,
                    title: {
                        display: true,
                        text: 'Month',
                        font: {
                            family: "'Inter', sans-serif",
                            weight: 'bold',
                            size: 13
                        }
                    }
                }
            }
        }
    });
    
    // Flight Searches Chart
    const flightsCtx = document.getElementById('flights-chart').getContext('2d');
    flightsChart = new Chart(flightsCtx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: '2023',
                    data: southKoreaData.flightSearches['2023'],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: '2024',
                    data: southKoreaData.flightSearches['2024'],
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            ...chartConfig,
            plugins: {
                ...chartConfig.plugins,
                title: {
                    display: true,
                    text: 'South Korea Flight Searches',
                    font: {
                        family: "'Inter', sans-serif",
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                }
            },
            scales: {
                ...chartConfig.scales,
                y: {
                    ...chartConfig.scales.y,
                    title: {
                        display: true,
                        text: 'Flight Searches',
                        font: {
                            family: "'Inter', sans-serif",
                            weight: 'bold',
                            size: 13
                        }
                    }
                },
                x: {
                    ...chartConfig.scales.x,
                    title: {
                        display: true,
                        text: 'Month',
                        font: {
                            family: "'Inter', sans-serif",
                            weight: 'bold',
                            size: 13
                        }
                    }
                }
            }
        }
    });
    
    // Hotel Guests Chart
    const hotelCtx = document.getElementById('hotel-chart').getContext('2d');
    hotelChart = new Chart(hotelCtx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: '2023',
                    data: southKoreaData.hotelGuests['2023'],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: '2024',
                    data: southKoreaData.hotelGuests['2024'],
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            ...chartConfig,
            plugins: {
                ...chartConfig.plugins,
                title: {
                    display: true,
                    text: 'South Korea Hotel Guests',
                    font: {
                        family: "'Inter', sans-serif",
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                }
            },
            scales: {
                ...chartConfig.scales,
                y: {
                    ...chartConfig.scales.y,
                    title: {
                        display: true,
                        text: 'Hotel Guests',
                        font: {
                            family: "'Inter', sans-serif",
                            weight: 'bold',
                            size: 13
                        }
                    }
                },
                x: {
                    ...chartConfig.scales.x,
                    title: {
                        display: true,
                        text: 'Month',
                        font: {
                            family: "'Inter', sans-serif",
                            weight: 'bold',
                            size: 13
                        }
                    }
                }
            }
        }
    });
}

function setupTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab content
            const tabId = this.getAttribute('data-tab');
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

function setupScenarioButtons() {
    const scenarioButtons = document.querySelectorAll('.scenario-btn');
    scenarioButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            scenarioButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update chart based on selected scenario
            updateQueriesChart(this.getAttribute('data-scenario'));
        });
    });
}

function updateQueriesChart(scenario) {
    // Clear existing datasets
    queriesChart.data.datasets = [];
    
    if (scenario === 'actual') {
        // Show 2023 and 2024 actual data
        queriesChart.data.datasets.push({
            label: '2023 Actual',
            data: southKoreaData.travelQueries['2023'],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.1)',
            borderWidth: 2,
            fill: false
        });
        
        queriesChart.data.datasets.push({
            label: '2024 Actual',
            data: southKoreaData.travelQueries['2024'],
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.1)',
            borderWidth: 2,
            fill: false
        });
    } else {
        // Show 2024 actual and 2025 forecast for selected scenario
        queriesChart.data.datasets.push({
            label: '2024 Actual',
            data: southKoreaData.travelQueries['2024'],
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.1)',
            borderWidth: 2,
            fill: false
        });
        
        queriesChart.data.datasets.push({
            label: `2025 ${scenario.charAt(0).toUpperCase() + scenario.slice(1)}`,
            data: southKoreaData.travelQueries['2025'][scenario],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.1)',
            borderWidth: 2,
            fill: false
        });
    }
    
    // Update chart
    queriesChart.update();
}

function setupPrintButton() {
    const printBtn = document.querySelector('.print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            // Export functionality would go here
            alert('Export functionality would be implemented here.');
        });
    }
}
