import { View, Text, TextInput, FlatList, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { MoonIcon } from 'react-native-heroicons/outline'
import { Bars3BottomLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/solid'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import RecipeCard from '../components/recipeCard'
import { useTheme } from '../theme/theme'

export default function Home({ navigation }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
      <View className='flex-1 p-5' style={{backgroundColor: isDarkMode ? '#323031' : '#FFFFFF'}}>
        <View className='flex flex-row items-center justify-between mt-4'>
          <TouchableOpacity>
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
              data={recipes}
              renderItem={({ item }) => { return (
              <TouchableOpacity onPress={() => navigation.navigate('Recipe', {item})}>
                <RecipeCard recipe={item}/>
              </TouchableOpacity>  
              )}}
              showsVerticalScrollIndicator={false}
            />
        </View>
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