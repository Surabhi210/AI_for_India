/**
 * Kisan AI - Logic Module
 * Handles crop recommendations, mandi price data, and weather insights
 */

// Mock dataset for Indian Mandi Prices
const mandiData = {
    // Punjab
    'punjab': {
        'rice': [
            { name: 'Basmati Rice', price: 3200, location: 'Amritsar Mandi', trend: 'up' },
            { name: 'Paddy', price: 2100, location: 'Ludhiana Mandi', trend: 'stable' },
            { name: 'Brown Rice', price: 2800, location: 'Patiala Mandi', trend: 'down' }
        ],
        'wheat': [
            { name: 'Wheat (Premium)', price: 2450, location: 'Amritsar Mandi', trend: 'stable' },
            { name: 'Sharbati Wheat', price: 2650, location: 'Ludhiana Mandi', trend: 'up' }
        ],
        'maize': [
            { name: 'Yellow Maize', price: 1850, location: 'Bathinda Mandi', trend: 'up' },
            { name: 'White Maize', price: 1750, location: 'Ferozepur Mandi', trend: 'stable' }
        ]
    },
    // Haryana
    'haryana': {
        'wheat': [
            { name: 'Wheat (Desi)', price: 2300, location: 'Karnal Mandi', trend: 'stable' },
            { name: 'Wheat (Hybrid)', price: 2250, location: 'Hisar Mandi', trend: 'down' },
            { name: 'Durum Wheat', price: 2550, location: 'Ambala Mandi', trend: 'up' }
        ],
        'rice': [
            { name: 'Basmati (1121)', price: 3500, location: 'Karnal Mandi', trend: 'up' },
            { name: 'Parmal Rice', price: 1950, location: 'Panipat Mandi', trend: 'stable' }
        ],
        'bajra': [
            { name: 'Pearl Millet', price: 1650, location: 'Bhiwani Mandi', trend: 'stable' },
            { name: 'Bajra (Desi)', price: 1550, location: 'Rohtak Mandi', trend: 'up' }
        ]
    },
    // Karnataka
    'karnataka': {
        'tomato': [
            { name: 'Hybrid Tomato', price: 1200, location: 'Kolar Mandi', trend: 'down' },
            { name: 'Local Tomato', price: 1400, location: 'Hassan Mandi', trend: 'up' },
            { name: 'Cherry Tomato', price: 2800, location: 'Bangalore APMC', trend: 'stable' }
        ],
        'onion': [
            { name: 'Red Onion', price: 1800, location: 'Hubli Mandi', trend: 'up' },
            { name: 'White Onion', price: 1600, location: 'Belgaum Mandi', trend: 'stable' }
        ],
        'ragi': [
            { name: 'Finger Millet', price: 2900, location: 'Mysore Mandi', trend: 'up' },
            { name: 'Ragi (Whole)', price: 2750, location: 'Mandya Mandi', trend: 'stable' }
        ],
        'coffee': [
            { name: 'Arabica Coffee', price: 12500, location: 'Chikkamagaluru', trend: 'up' },
            { name: 'Robusta Coffee', price: 9500, location: 'Kodagu Mandi', trend: 'stable' }
        ]
    },
    // Maharashtra
    'maharashtra': {
        'cotton': [
            { name: 'Shankar-6 Cotton', price: 6200, location: 'Nagpur Mandi', trend: 'up' },
            { name: 'MCU-5 Cotton', price: 6400, location: 'Wardha Mandi', trend: 'stable' }
        ],
        'soyabean': [
            { name: 'Yellow Soyabean', price: 4200, location: 'Amravati Mandi', trend: 'stable' },
            { name: 'Black Soyabean', price: 4100, location: 'Akola Mandi', trend: 'down' }
        ],
        'turmeric': [
            { name: 'Nizamabad Turmeric', price: 8500, location: 'Nanded Mandi', trend: 'up' },
            { name: 'Salem Turmeric', price: 7800, location: 'Latur Mandi', trend: 'up' }
        ],
        'sugarcane': [
            { name: 'Sugarcane (Jaggery)', price: 3200, location: 'Pune APMC', trend: 'stable' },
            { name: 'Sugarcane (Raw)', price: 280, location: 'Kolhapur Mandi', trend: 'up', unit: 'ton' }
        ]
    },
    // Uttar Pradesh
    'uttar-pradesh': {
        'potato': [
            { name: 'Chips Potato', price: 950, location: 'Agra Mandi', trend: 'stable' },
            { name: 'Table Potato', price: 1100, location: 'Lucknow Mandi', trend: 'up' },
            { name: 'Seed Potato', price: 1400, location: 'Meerut Mandi', trend: 'stable' }
        ],
        'sugarcane': [
            { name: 'Sugarcane (Early)', price: 310, location: 'Muzaffarnagar', trend: 'up', unit: 'ton' },
            { name: 'Sugarcane (Late)', price: 305, location: 'Baghpat Mandi', trend: 'stable', unit: 'ton' }
        ],
        'wheat': [
            { name: 'UP Wheat', price: 2250, location: 'Kanpur Mandi', trend: 'stable' },
            { name: 'Wheat (Premium)', price: 2350, location: 'Varanasi Mandi', trend: 'up' }
        ],
        'mentha': [
            { name: 'Mentha Oil', price: 950, location: 'Barabanki Mandi', trend: 'down' }
        ]
    },
    // Gujarat
    'gujarat': {
        'cotton': [
            { name: 'Cotton (Shankar)', price: 6100, location: 'Rajkot Mandi', trend: 'stable' },
            { name: 'Cotton (H4)', price: 6300, location: 'Ahmedabad APMC', trend: 'up' }
        ],
        'groundnut': [
            { name: 'Groundnut (Kernels)', price: 5200, location: 'Junagadh Mandi', trend: 'up' },
            { name: 'Groundnut (Pods)', price: 4800, location: 'Amreli Mandi', trend: 'stable' },
            { name: 'Groundnut Oil', price: 14500, location: 'Bhavnagar Mandi', trend: 'up' }
        ],
        'cumin': [
            { name: 'Cumin Seed', price: 18500, location: 'Unjha Mandi', trend: 'up' },
            { name: 'Black Cumin', price: 22000, location: 'Patan Mandi', trend: 'stable' }
        ]
    },
    // Rajasthan
    'rajasthan': {
        'bajra': [
            { name: 'Pearl Millet', price: 1700, location: 'Jaipur Mandi', trend: 'stable' },
            { name: 'Bajra (Desi)', price: 1600, location: 'Jodhpur Mandi', trend: 'up' }
        ],
        'mustard': [
            { name: 'Yellow Mustard', price: 5500, location: 'Bharatpur Mandi', trend: 'up' },
            { name: 'Mustard Seed', price: 5800, location: 'Sri Ganganagar', trend: 'up' },
            { name: 'Mustard Oil', price: 12500, location: 'Alwar Mandi', trend: 'stable' }
        ],
        'moong': [
            { name: 'Green Gram', price: 7200, location: 'Kota Mandi', trend: 'stable' },
            { name: 'Moong Dal', price: 8500, location: 'Udaipur Mandi', trend: 'up' }
        ],
        'guar': [
            { name: 'Guar Seed', price: 4200, location: 'Jodhpur Mandi', trend: 'down' },
            { name: 'Guar Gum', price: 16500, location: 'Bikaner Mandi', trend: 'stable' }
        ]
    },
    // Madhya Pradesh
    'madhya-pradesh': {
        'soyabean': [
            { name: 'MP Soyabean', price: 4150, location: 'Indore Mandi', trend: 'stable' },
            { name: 'Soyabean (Yellow)', price: 4250, location: 'Ujjain Mandi', trend: 'up' }
        ],
        'wheat': [
            { name: 'Sharbati Wheat', price: 2450, location: 'Sehore Mandi', trend: 'up' },
            { name: 'Durum Wheat', price: 2350, location: 'Bhopal Mandi', trend: 'stable' }
        ],
        'chana': [
            { name: 'Desi Chana', price: 5400, location: 'Vidisha Mandi', trend: 'up' },
            { name: 'Kabuli Chana', price: 6200, location: 'Gwalior Mandi', trend: 'stable' }
        ]
    },
    // Tamil Nadu
    'tamil-nadu': {
        'rice': [
            { name: 'Ponni Rice', price: 2400, location: 'Thanjavur Mandi', trend: 'stable' },
            { name: 'Sona Masoori', price: 2800, location: 'Madurai Mandi', trend: 'up' },
            { name: 'IR-20 Rice', price: 1900, location: 'Trichy Mandi', trend: 'stable' }
        ],
        'banana': [
            { name: 'Nendran Banana', price: 35, location: 'Coimbatore', trend: 'up', unit: 'dozen' },
            { name: 'Poovan Banana', price: 28, location: 'Salem Mandi', trend: 'stable', unit: 'dozen' }
        ],
        'turmeric': [
            { name: 'Erode Turmeric', price: 8200, location: 'Erode Mandi', trend: 'up' },
            { name: 'Salem Turmeric', price: 8000, location: 'Salem Mandi', trend: 'stable' }
        ]
    },
    // West Bengal
    'west-bengal': {
        'rice': [
            { name: 'Gobindobhog', price: 5200, location: 'Burdwan Mandi', trend: 'up' },
            { name: 'Tulaipanji', price: 4800, location: 'Murshidabad', trend: 'stable' },
            { name: 'Minikit Rice', price: 2100, location: 'Midnapore Mandi', trend: 'stable' }
        ],
        'potato': [
            { name: 'Jyoti Potato', price: 950, location: 'Hooghly Mandi', trend: 'down' },
            { name: 'Chandramukhi', price: 1100, location: 'Nadia Mandi', trend: 'stable' }
        ],
        'jute': [
            { name: 'TD-5 Jute', price: 4800, location: 'Kolkata APMC', trend: 'stable' },
            { name: 'White Jute', price: 5100, location: 'Howrah Mandi', trend: 'up' }
        ]
    },
    // Kerala
    'kerala': {
        'rubber': [
            { name: 'Natural Rubber', price: 152, location: 'Kottayam', trend: 'up', unit: 'kg' }
        ],
        'pepper': [
            { name: 'Black Pepper', price: 38500, location: 'Kochi Mandi', trend: 'stable' },
            { name: 'White Pepper', price: 52000, location: 'Alappuzha', trend: 'up' }
        ],
        'cardamom': [
            { name: 'Green Cardamom', price: 95000, location: 'Idukki Mandi', trend: 'up' }
        ],
        'coconut': [
            { name: 'Copra', price: 8200, location: 'Calicut Mandi', trend: 'stable' },
            { name: 'Coconut Oil', price: 14500, location: 'Kannur Mandi', trend: 'down' }
        ]
    },
    // Andhra Pradesh
    'andhra-pradesh': {
        'chili': [
            { name: 'Guntur Sannam', price: 12500, location: 'Guntur Mandi', trend: 'up' },
            { name: 'Byadgi Chili', price: 15500, location: 'Khammam Mandi', trend: 'stable' }
        ],
        'cotton': [
            { name: 'AP Cotton', price: 6000, location: 'Guntur Mandi', trend: 'stable' }
        ],
        'tobacco': [
            { name: 'Flue Cured', price: 185, location: 'Prakasam', trend: 'up', unit: 'kg' }
        ]
    },
    // Telangana
    'telangana': {
        'cotton': [
            { name: 'Telangana Cotton', price: 6150, location: 'Warangal Mandi', trend: 'stable' }
        ],
        'red-gram': [
            { name: 'Tur Dal', price: 6800, location: 'Nizamabad', trend: 'up' },
            { name: 'Red Gram', price: 6500, location: 'Karimnagar', trend: 'stable' }
        ],
        'paddy': [
            { name: 'Sona Masoori', price: 1850, location: 'Medak Mandi', trend: 'stable' }
        ]
    },
    // Bihar
    'bihar': {
        'litchi': [
            { name: 'Shahi Litchi', price: 85, location: 'Muzaffarpur', trend: 'up', unit: 'kg' }
        ],
        'makhana': [
            { name: 'Fox Nut', price: 850, location: 'Darbhanga', trend: 'stable', unit: 'kg' }
        ],
        'maize': [
            { name: 'Yellow Maize', price: 1750, location: 'Purnia Mandi', trend: 'stable' }
        ]
    },
    // Odisha
    'odisha': {
        'rice': [
            { name: 'Kala Jeera', price: 5500, location: 'Koraput Mandi', trend: 'up' }
        ],
        'cashew': [
            { name: 'Raw Cashew', price: 95, location: 'Kendujhar', trend: 'stable', unit: 'kg' }
        ]
    }
};

// Crop recommendations based on state characteristics
const cropRecommendations = {
    // Arid/Desert states - low water crops
    'rajasthan': {
        climate: 'Arid, low rainfall (<300mm annually)',
        recommended: ['Bajra (Pearl Millet)', 'Mustard', 'Moong (Green Gram)', 'Guar', 'Moth Bean', 'Sesame'],
        avoid: ['Rice', 'Sugarcane', 'Water-intensive crops'],
        soilType: 'Sandy, desert soil',
        irrigation: 'Drip irrigation recommended',
        tips: [
            'Use drought-resistant varieties',
            'Implement drip irrigation to save water',
            'Mulching helps retain soil moisture',
            'Mustard is ideal - requires minimal water',
            'Bajra is drought-tolerant and nutritious'
        ]
    },
    'gujarat': {
        climate: 'Semi-arid to arid',
        recommended: ['Cotton', 'Groundnut', 'Cumin', 'Bajra', 'Castor'],
        avoid: ['Water-intensive rice varieties'],
        soilType: 'Mixed - coastal to desert',
        irrigation: 'Check dam and drip irrigation',
        tips: [
            'Groundnut is the traditional crop here',
            'Cumin grows well in Gujarat\'s climate',
            'Cotton is a major cash crop',
            'Use Bt cotton for better pest resistance'
        ]
    },
    // Northern plains - wheat belt
    'punjab': {
        climate: 'Semi-arid, well-irrigated',
        recommended: ['Wheat', 'Rice (Basmati)', 'Maize', 'Barley', 'Mustard'],
        avoid: ['Crops unsuitable for heavy soils'],
        soilType: 'Alluvial, fertile',
        irrigation: 'Canal and tubewell abundant',
        tips: [
            'Wheat-Rice rotation is traditional',
            'Basmati from Punjab is world-famous',
            'Crop diversification recommended',
            'Maize as alternative to rice saves water'
        ]
    },
    'haryana': {
        climate: 'Semi-arid, good irrigation',
        recommended: ['Wheat', 'Rice (Basmati)', 'Bajra', 'Sugarcane', 'Cotton'],
        avoid: ['Excessive rice in water-scarce areas'],
        soilType: 'Alluvial plains',
        irrigation: 'Canal network extensive',
        tips: [
            'Karnal is famous for Basmati',
            'Bajra in drier regions',
            'Crop rotation improves soil health',
            'Sugarcane in well-watered areas'
        ]
    },
    'uttar-pradesh': {
        climate: 'Subtropical, varied',
        recommended: ['Wheat', 'Sugarcane', 'Potato', 'Rice', 'Pulses', 'Mentha'],
        avoid: ['Very water-intensive in Bundelkhand'],
        soilType: 'Gangetic alluvial',
        irrigation: 'River and canal network',
        tips: [
            'Sugarcane is major cash crop',
            'Potato grows well in western UP',
            'Mentha in Barabanki region',
            'Wheat in central and eastern UP'
        ]
    },
    // Central India
    'madhya-pradesh': {
        climate: 'Subtropical, moderate rainfall',
        recommended: ['Soyabean', 'Wheat', 'Chana', 'Cotton', 'Paddy', 'Maize'],
        avoid: ['Crops sensitive to waterlogging'],
        soilType: 'Black cotton soil (Malwa)',
        irrigation: 'Mixed - rainfed and irrigated',
        tips: [
            'MP is the soyabean capital of India',
            'Sharbati wheat is premium quality',
            'Cotton in black soil areas',
            'Chana in Rabi season'
        ]
    },
    // Deccan plateau
    'maharashtra': {
        climate: 'Tropical monsoon, varied',
        recommended: ['Cotton', 'Soyabean', 'Turmeric', 'Sugarcane', 'Grapes', 'Onion'],
        avoid: ['Water-intensive crops in drought areas'],
        soilType: 'Black cotton soil',
        irrigation: 'Uneven - some areas rainfed',
        tips: [
            'Cotton is traditional in Vidarbha',
            'Soyabean in Marathwada',
            'Turmeric from Nanded',
            'Sugarcane in western Maharashtra'
        ]
    },
    'karnataka': {
        climate: 'Tropical to semi-arid',
        recommended: ['Ragi', 'Coffee', 'Tomato', 'Onion', 'Rice', 'Cotton', 'Jowar'],
        avoid: ['Crops needing extreme cold'],
        soilType: 'Red and lateritic',
        irrigation: 'Mixed, tank irrigation common',
        tips: [
            'Ragi is the staple crop',
            'Coffee in Malnad region',
            'Kolar is tomato hub',
            'Onion from North Karnataka'
        ]
    },
    'telangana': {
        climate: 'Semi-arid, hot',
        recommended: ['Cotton', 'Red Gram (Tur)', 'Paddy', 'Chili', 'Turmeric'],
        avoid: ['Water-intensive in drought-prone areas'],
        soilType: 'Red sandy to black',
        irrigation: 'Improving with projects',
        tips: [
            'Cotton is major crop',
            'Tur dal production high',
            'Chili from Guntur region',
            'Mission Kakatiya helps irrigation'
        ]
    },
    'andhra-pradesh': {
        climate: 'Tropical, hot and humid',
        recommended: ['Chili', 'Cotton', 'Tobacco', 'Rice', 'Groundnut'],
        avoid: ['Cold climate crops'],
        soilType: 'Red and black',
        irrigation: 'Godavari and Krishna deltas',
        tips: [
            'Guntur chili famous worldwide',
            'Tobacco in Prakasam',
            'Rice in coastal deltas',
            'Cotton in Rayalaseema'
        ]
    },
    // Eastern states
    'west-bengal': {
        climate: 'Tropical humid',
        recommended: ['Rice (Gobindobhog)', 'Potato', 'Jute', 'Mustard', 'Vegetables'],
        avoid: ['Arid climate crops'],
        soilType: 'Alluvial Gangetic',
        irrigation: 'River-fed, good rainfall',
        tips: [
            'Bengal rice varieties are aromatic',
            'Jute is traditional crop',
            'Potato in Hooghly belt',
            'Vegetable cultivation profitable'
        ]
    },
    'bihar': {
        climate: 'Subtropical humid',
        recommended: ['Rice', 'Wheat', 'Maize', 'Litchi', 'Makhana', 'Vegetables'],
        avoid: ['Very drought-tolerant only crops'],
        soilType: 'Alluvial Gangetic',
        irrigation: 'Good river network',
        tips: [
            'Muzaffarpur litchi famous',
            'Makhana from Darbhanga',
            'Rice-wheat rotation common',
            'Vegetable farming growing'
        ]
    },
    'odisha': {
        climate: 'Tropical humid',
        recommended: ['Rice (Kala Jeera)', 'Cashew', 'Cotton', 'Pulses'],
        avoid: ['Cold climate crops'],
        soilType: 'Red and lateritic to alluvial',
        irrigation: 'Rainfed in many areas',
        tips: [
            'Koraput has aromatic varieties',
            'Cashew in tribal belts',
            'Rice is main crop',
            'Forest produce important'
        ]
    },
    // Southern states
    'tamil-nadu': {
        climate: 'Tropical hot',
        recommended: ['Rice (Ponni)', 'Banana', 'Turmeric', 'Cotton', 'Sugarcane', 'Groundnut'],
        avoid: ['Cold climate crops'],
        soilType: 'Red loam to alluvial',
        irrigation: 'Cauvery delta excellent',
        tips: [
            'Thanjavur rice bowl of TN',
            'Ponni rice is famous',
            'Erode turmeric quality',
            'Banana cultivation extensive'
        ]
    },
    'kerala': {
        climate: 'Tropical wet',
        recommended: ['Rubber', 'Pepper', 'Cardamom', 'Coconut', 'Tea', 'Coffee'],
        avoid: ['Arid region crops'],
        soilType: 'Lateritic and alluvial',
        irrigation: 'Heavy rainfall based',
        tips: [
            'Rubber is major crop',
            'Spices - pepper, cardamom',
            'Coconut everywhere',
            'Plantation crops dominate'
        ]
    },
    // Northeast
    'assam': {
        climate: 'Tropical monsoon',
        recommended: ['Tea', 'Rice', 'Jute', 'Sugarcane', 'Bamboo', 'Turmeric'],
        avoid: ['Arid crops'],
        soilType: 'Alluvial, acidic',
        irrigation: 'Heavy rainfall',
        tips: [
            'Assam tea world famous',
            'Bamboo varieties abundant',
            'Rice in Brahmaputra valley',
            'Muga silk also cultivated'
        ]
    },
    // Hill states
    'himachal-pradesh': {
        climate: 'Temperate to alpine',
        recommended: ['Apple', 'Potato', 'Ginger', 'Peas', 'Off-season vegetables'],
        avoid: ['Hot climate tropical crops'],
        soilType: 'Mountain, varied',
        irrigation: 'Stream and spring based',
        tips: [
            'Apple is king of HP',
            'Shimla mirch (capsicum)',
            'Potato seed production',
            'Off-season vegetables'
        ]
    },
    'uttarakhand': {
        climate: 'Temperate, mountainous',
        recommended: ['Basmati Rice', 'Wheat', 'Apple', 'Off-season vegetables', 'Herbs'],
        avoid: ['Hot tropical crops'],
        soilType: 'Mountain, terai alluvial',
        irrigation: 'River and stream',
        tips: [
            'Basmati from tarai region',
            'Apples in higher reaches',
            'Organic farming promoted',
            'Herbs and medicinal plants'
        ]
    },
    // Default for unmapped states
    'default': {
        climate: 'Varied - consult local agriculture office',
        recommended: ['Wheat', 'Rice', 'Pulses', 'Oilseeds'],
        avoid: ['Check local advisories'],
        soilType: 'Varies by region',
        irrigation: 'Assess local water availability',
        tips: [
            'Consult local KVK (Krishi Vigyan Kendra)',
            'Check weather forecasts regularly',
            'Practice crop rotation',
            'Use organic fertilizers when possible'
        ]
    }
};

// Weather mock data generator
function generateWeatherData(state, crop) {
    const baseTemps = {
        'rajasthan': 35, 'gujarat': 32, 'punjab': 28, 'haryana': 29,
        'maharashtra': 30, 'karnataka': 28, 'tamil-nadu': 31, 'kerala': 29,
        'west-bengal': 28, 'bihar': 30, 'odisha': 31, 'assam': 27,
        'himachal-pradesh': 22, 'uttarakhand': 24, 'madhya-pradesh': 29,
        'uttar-pradesh': 30, 'andhra-pradesh': 33, 'telangana': 32
    };
    
    const baseTemp = baseTemps[state] || 28;
    const variation = Math.floor(Math.random() * 6) - 3;
    const temp = baseTemp + variation;
    
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    const humidity = 45 + Math.floor(Math.random() * 35);
    const rainfall = Math.floor(Math.random() * 15);
    
    const cropTips = {
        'wheat': temp > 30 ? 'Consider irrigation if soil is dry' : 'Favorable conditions',
        'rice': 'Ensure adequate water standing in fields',
        'cotton': temp > 32 ? 'Watch for pest activity in heat' : 'Good growing weather',
        'bajra': 'Heat tolerant - doing well',
        'mustard': temp < 25 ? 'Flowering stage - protect from frost' : 'Normal growth',
        'default': 'Monitor crop health regularly'
    };
    
    return {
        temperature: temp,
        condition: condition,
        humidity: humidity,
        rainfall: rainfall,
        forecast: `${rainfall + 5}mm expected next 3 days`,
        alert: temp > 38 ? 'Heat wave alert - provide shade/irrigation' : null,
        cropTip: cropTips[crop] || cropTips['default']
    };
}

// Main function to get insights
function getKisanInsights() {
    const stateSelect = document.getElementById('state-select');
    const cropInput = document.getElementById('crop-input');
    const state = stateSelect.value;
    const crop = cropInput.value.toLowerCase().trim();
    
    if (!state || !crop) {
        alert('Please select your state and enter a crop name');
        return;
    }
    
    // Update all cards
    updateMandiCard(state, crop);
    updateRecommendations(state, crop);
    updateWeatherCard(state, crop);
    
    // Show data sections
    document.querySelectorAll('.kisan-card-empty').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.kisan-card-data').forEach(el => el.style.display = 'block');
}

// Update Mandi Price card with table
function updateMandiCard(state, crop) {
    const stateData = mandiData[state];
    const mandiContainer = document.getElementById('mandi-card');
    const dataDiv = mandiContainer.querySelector('.kisan-card-data');
    
    if (!stateData || !stateData[crop]) {
        // No specific data - show generic message
        dataDiv.innerHTML = `
            <div class="kisan-data-item">
                <span class="kisan-data-label">Status</span>
                <span class="kisan-data-value">Limited data for ${crop} in ${state}</span>
            </div>
            <div class="kisan-data-item">
                <span class="kisan-data-label">Estimated Price</span>
                <span class="kisan-data-value kisan-price">₹${Math.floor(Math.random() * 3000 + 1500)}/quintal</span>
            </div>
            <div class="kisan-data-item">
                <span class="kisan-data-label">Suggestion</span>
                <span class="kisan-data-value">Contact local mandi for current rates</span>
            </div>
        `;
        return;
    }
    
    const prices = stateData[crop];
    const avgPrice = Math.floor(prices.reduce((sum, p) => sum + p.price, 0) / prices.length);
    
    // Build table HTML
    let tableHTML = `
        <div class="kisan-mandi-table-wrapper">
            <table class="kisan-mandi-table">
                <thead>
                    <tr>
                        <th>Variety</th>
                        <th>Price/Qtl</th>
                        <th>Market</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    prices.forEach(item => {
        const unit = item.unit || 'quintal';
        const trendIcon = item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→';
        const trendClass = item.trend === 'up' ? 'trend-up' : item.trend === 'down' ? 'trend-down' : 'trend-stable';
        tableHTML += `
            <tr>
                <td>${item.name}</td>
                <td class="${trendClass}">
                    ₹${item.price.toLocaleString()}/${unit === 'kg' ? 'kg' : 'qtl'}
                    <span class="trend-indicator">${trendIcon}</span>
                </td>
                <td>${item.location}</td>
            </tr>
        `;
    });
    
    tableHTML += `
                </tbody>
            </table>
        </div>
        <div class="kisan-data-item kisan-price-highlight" style="margin-top: 16px;">
            <span class="kisan-data-label">Average Price</span>
            <span class="kisan-data-value kisan-price">₹${avgPrice.toLocaleString()}/quintal</span>
        </div>
        <div class="kisan-data-item">
            <span class="kisan-data-label">Best Market</span>
            <span class="kisan-data-value">${prices[0].location}</span>
        </div>
    `;
    
    dataDiv.innerHTML = tableHTML;
}

// Update recommendations card
function updateRecommendations(state, crop) {
    const recData = cropRecommendations[state] || cropRecommendations['default'];
    const cropContainer = document.getElementById('crop-card');
    const dataDiv = cropContainer.querySelector('.kisan-card-data');
    
    const isRecommended = recData.recommended.some(r => 
        r.toLowerCase().includes(crop) || crop.includes(r.toLowerCase().split(' ')[0])
    );
    
    let html = `
        <div class="kisan-rec-climate">
            <div class="kisan-rec-label">Climate</div>
            <div class="kisan-rec-value">${recData.climate}</div>
        </div>
        <div class="kisan-data-item">
            <span class="kisan-data-label">Soil Type</span>
            <span class="kisan-data-value">${recData.soilType}</span>
        </div>
    `;
    
    if (isRecommended) {
        html += `
            <div class="kisan-rec-badge success">
                <span>✓</span> Good choice for ${state.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </div>
        `;
    } else if (recData.avoid.some(a => a.toLowerCase().includes(crop))) {
        html += `
            <div class="kisan-rec-badge warning">
                <span>⚠</span> Consider alternatives for this region
            </div>
        `;
    }
    
    html += `
        <div class="kisan-rec-section">
            <div class="kisan-rec-title">Recommended Crops</div>
            <div class="kisan-rec-tags">
                ${recData.recommended.map(r => `<span class="kisan-tag">${r}</span>`).join('')}
            </div>
        </div>
    `;
    
    html += `
        <div class="kisan-rec-tips">
            <div class="kisan-rec-title">💡 Tips for ${state.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
            <ul>
                ${recData.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        </div>
    `;
    
    dataDiv.innerHTML = html;
}

// Update weather card
function updateWeatherCard(state, crop) {
    const weather = generateWeatherData(state, crop);
    const weatherContainer = document.getElementById('weather-card');
    const dataDiv = weatherContainer.querySelector('.kisan-card-data');
    
    const alertHTML = weather.alert ? `
        <div class="kisan-weather-alert">
            <span>⚠️</span> ${weather.alert}
        </div>
    ` : '';
    
    dataDiv.innerHTML = `
        ${alertHTML}
        <div class="kisan-weather-main">
            <span class="kisan-weather-temp">${weather.temperature}°C</span>
            <span class="kisan-weather-condition">${weather.condition}</span>
        </div>
        <div class="kisan-data-item">
            <span class="kisan-data-label">Humidity</span>
            <span class="kisan-data-value">${weather.humidity}%</span>
        </div>
        <div class="kisan-data-item">
            <span class="kisan-data-label">Rainfall Forecast</span>
            <span class="kisan-data-value">${weather.forecast}</span>
        </div>
        <div class="kisan-data-item">
            <span class="kisan-data-label">Crop Tip</span>
            <span class="kisan-data-value" style="text-align: right; max-width: 60%;">${weather.cropTip}</span>
        </div>
    `;
}

// Export for global access
window.getKisanInsights = getKisanInsights;
window.mandiData = mandiData;
window.cropRecommendations = cropRecommendations;
