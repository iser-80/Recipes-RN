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
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setData(recipes)
  }, [])

  const handleSideMenuVisible = () => {
    setSideMenuVisible(!sideMenuVisible)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    const formatedQuery = searchQuery.toLowerCase()
    const filtredData = filter(recipes, (recipe) => {
      return contains(recipe, formatedQuery)
    })
    setData(filtredData)
  }

  const contains = (recipe, query) => {
    if (recipe && recipe.title) {
      const recipeTitle = recipe.title.toLowerCase();
      const formattedQuery = query.toLowerCase();
  
      return recipeTitle.includes(formattedQuery);
    }
  
    return false; 
  };
  
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
            className='ml-4 w-full' 
            style={{fontFamily: 'poppins'}}
            placeholder='Search for your recipe'
            clearButtonMode='always'
            onChangeText={(query) => handleSearch(query)}
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
              data={searchQuery === '' ? recipes : data}
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

const recipes = [
  {
    title: 'Pizza Italiano',
    description: 'The first thing you must do is preheat your oven up as high as it will go. It takes longer than you think to heat your oven up all the way! You want to give your oven at least 30 minutes to preheat. If you have a pizza stone, make sure its inside the preheating oven.',
    image: require('../../assets/images/pizza.jpg'),
    difficulty: 'easy',
    time: '25'
  },
  {
    title: 'Salade',
    description: 'The first thing you must do is preheat your oven up as high as it will go. It takes longer than you think to heat your oven up all the way! You want to give your oven at least 30 minutes to preheat. If you have a pizza stone, make sure its inside the preheating oven.',
    image: require('../../assets/images/salade.jpg'),
    difficulty: 'medium',
    time: '30'
  },
  {
    title: 'Pizza Italiano',
    description: 'The first thing you must do is preheat your oven up as high as it will go. It takes longer than you think to heat your oven up all the way! You want to give your oven at least 30 minutes to preheat. If you have a pizza stone, make sure its inside the preheating oven.',
    image: require('../../assets/images/pizza.jpg'),
    difficulty: 'easy',
    time: '25'
  },
  {
    title: 'Pizza Italiano',
    description: 'The first thing you must do is preheat your oven up as high as it will go. It takes longer than you think to heat your oven up all the way! You want to give your oven at least 30 minutes to preheat. If you have a pizza stone, make sure its inside the preheating oven.',
    image: require('../../assets/images/pizza.jpg'),
    difficulty: 'easy',
    time: '25'
  },
]