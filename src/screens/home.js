import { View, Text, TextInput, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MoonIcon } from 'react-native-heroicons/outline'
import { Bars3BottomLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/solid'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import RecipeCard from '../components/recipeCard'
import { useTheme } from '../theme/theme'
import SideMenu from '../sideBar/sideMenu'
import filter from 'lodash.filter'

export default function Home({ navigation }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [sideMenuVisible, setSideMenuVisible] = useState(false)
  const [data, setData] = useState([])
  const [mealCategories, setMealCategories] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [updateData, setUpdateData] = useState(false)
  const [activeCat, setActiveCat] = useState(null)
  const [searchedMeal, setSearchedMeal] = useState(null);

  const [isLoading, setLoading] = useState(true);

  const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
  const API_CAT_URL = 'https://www.themealdb.com/api/json/v1/1/categories.php'
  const API_FIL_CAT = 'https://www.themealdb.com/api/json/v1/1/filter.php?c='
  const API_FIL_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
  const API_FIL_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

  useEffect(() => {
    fetchApiRecipes()
    fetchAllMealCategories()
  }, [])

  useEffect(() => {
    if (searchedMeal) {
      fetchMealBySearch(searchedMeal);
    } else if (activeCat) {
      fetchMealsByCategory(activeCat);
    } else {
      setFilteredData(data);
    }
  }, [searchedMeal, activeCat, data]);

  // fetch all the meals from api
  const fetchApiRecipes = async () => {
    try {
      const response = await fetch(`${API_URL}`)
      const data = await response.json()
      if(data){
        setData(data.meals)
      }
    } catch (error) {
      console.error('error fetching api data : ', error)
    } finally {
      setLoading(false); // Set loading to false when the data is fetched (success or failure)
    }
  }

  // fetch a meal from search by name from api
const fetchMealBySearch = async (meal) => {
  try {
    const response = await fetch(`${API_FIL_NAME}${meal}`);
    const data = await response.json(); // Add 'await' here
    if (data && data.meals) {
      setFilteredData(data.meals);
    }
  } catch (error) {
    console.error('error while fetching for meals by name', error);
  }
};


  // fetch all the categories of the meals from api
  const fetchAllMealCategories = async () => {
    try {
      const response = await fetch(`${API_CAT_URL}`);
      const data = await response.json();
      
      if (data && data.categories) {
        setMealCategories(data.categories)
      }
    } catch (error) {
      console.error('Error fetching meal categories:', error);
    }
  };

  // fetch a meal by id from api
  const fetchMealById = async ( id ) => {
    try {
      const response = await fetch(`${API_FIL_ID}${id}`)
      const data = await response.json()
      if(data && data.meals){
        return data.meals
      }
    } catch (error) {
      console.error('error while fetching for meals by id : ', error)
      return null
    }
  }
  
  // fetch a meal or more by category
  const fetchMealsByCategory = async (category) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_FIL_CAT}${category}`);
      const data = await response.json();
  
      if (data && data.meals) {
        const mealPromises = data.meals.map(async (meal) => {
          const response = await fetchMealById(meal.idMeal);
          return response;
        });
  
        const updatedData = await Promise.all(mealPromises);
        const flattenedData = updatedData.flat();
        setFilteredData(flattenedData);
        
        setActiveCat(category)
        setUpdateData(true)
      }
    } catch (error) {
      console.error('Error while fetching meals by category:', error);
    } finally {
      setLoading(false); // Set loading to false when the data is fetched (success or failure)
    }
  };
  
  
  const handleSideMenuVisible = () => {
    setSideMenuVisible(!sideMenuVisible)
  }
  

  return (
      <View className='flex-1' style={{backgroundColor: isDarkMode ? '#323031' : '#FFFFFF', padding: sideMenuVisible ? '0' : '5%'}}>
        <View className='flex flex-row items-center justify-between mt-4'>
          <TouchableOpacity onPress={handleSideMenuVisible}>
            <Bars3BottomLeftIcon size={30} color={isDarkMode ? 'white' : 'black'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleTheme}>
            <MoonIcon size={30} color={isDarkMode ? 'white' : 'black'} fill='white' />
          </TouchableOpacity>
        </View>
        

        <Text className='text-4xl pr-[20%] mt-5' style={{fontFamily: 'kalnia-semiBold', color: isDarkMode ? 'white' : 'black'}}>
          What Would You Like To Cook Today ?
        </Text>
        <View className='flex flex-row items-center bg-gray-100 py-3 px-4 mt-3 rounded-lg' style={{elevation: 3}}>
          <MagnifyingGlassIcon size={25} color='gray'/>
          <TextInput 
            className='ml-4 w-[90%]' 
            style={{fontFamily: 'poppins'}}
            placeholder='Search for your recipe'
            clearButtonMode='always'
            onChangeText={(meal) => setSearchedMeal(meal)}
          />
        </View>
        <View className='my-2'>
          <FlatList
            className='py-2'
            data={mealCategories}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => { 
              const isActive = item.strCategory === activeCat

              return (
                <TouchableOpacity onPress={() => fetchMealsByCategory(item.strCategory)} className='mx-1 py-2 px-4 rounded-full bg-gray-100'>
                  <Text className={`text-sm ${isActive ? 'text-blue-500' : 'text-gray-700'}`}  style={{fontFamily: 'poppins'}}>{item.strCategory}</Text>
                </TouchableOpacity>
              )}}
          />
        </View>
        <View className='flex-1 mt-3'>
            <FlatList
              data={filteredData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => { return (
              <TouchableOpacity onPress={() => navigation.navigate('Recipe', {item})}>
                <RecipeCard recipe={item}/>
              </TouchableOpacity>  
              )}}
              showsVerticalScrollIndicator={false}
            />
        </View>
        {sideMenuVisible && <SideMenu closeSideMenu={() => setSideMenuVisible(false)} />}
      </View>
  )
}

