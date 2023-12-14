import { View, Text, TextInput, FlatList, Keyboard } from 'react-native'
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
  const [apiSearchedData, setApiSearchedData] = useState([])
  const [mealTypes, setMealTypes] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  // Recipes API
  // const API_KEY = '128a1fdd4d6d4c30b8bb35aa9ecbc053'
  // const API_URL = 'https://api.spoonacular.com/recipes/random'
  // const API_RBN = 'https://api.spoonacular.com/recipes/complexSearch'  

  const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

  useEffect(() => {
    fetchApiRecipes()
  }, [])


  const fetchApiRecipes = async () => {
    try {
      const response = await fetch(`${API_URL}`)
      const data = await response.json()
      if(data){
        setData(data.meals)
      }
    } catch (error) {
      console.error('error fetching api data : ', error)
    } 
  }
  
  const handleSideMenuVisible = () => {
    setSideMenuVisible(!sideMenuVisible)
  }

  // const handleSearchRecipe = async (query) => {
  //   try {
  //     const response = await fetch(`${API_RBN}?apiKey=${API_KEY}&query=${query}`)
  //     const data = await response.json()
  //     if(data){
  //       setApiSearchedData(data)
  //        console.log(apiSearchedData)
  //     }
  //   } catch (error) {
  //     console.log('error white searching for recipies : ', error)
  //   }
  // }

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
          />
        </View>
        <View className='my-2'>
          <FlatList
            className='py-2'
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) =>{ return (
              <TouchableOpacity className='mx-1 py-2 px-4 rounded-full bg-gray-100'>
                <Text className='text-sm' style={{fontFamily: 'poppins'}}>{item}</Text>
              </TouchableOpacity>
            )}}
          />
        </View>
        <View className='flex-1 mt-3'>
            <FlatList
              data={data}
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

const categories = [
  'All',
  'Appetizers',
  'Main Dishes',
  'Salads',
  'Soups',
  'Desserts',
  'BreakFast',
  'Snacks'
]
