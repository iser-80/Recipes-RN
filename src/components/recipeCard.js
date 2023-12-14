import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { ClockIcon, MapPinIcon, StarIcon } from 'react-native-heroicons/solid'
import { Touchable } from 'react-native'


export default function RecipeCard({ recipe }) {
    // const description = recipe.summary.substring(0, 60)
    // const recipeTitle = recipe.title && recipe.title.substring(0, 40)
    
  return (
        <View className='w-full h-[120px] mb-4 flex flex-row bg-neutral-50 rounded-md overflow-hidden' style={{elevation: 3}}>
        <Image source={{uri: recipe.strMealThumb}} className='h-full w-[30%]'/>
        <View className='flex-1 px-3 py-2'> 
            <Text className='text-xl' style={{fontFamily: 'poppins-semiBold'}}>{recipe.strMeal}</Text>
            <Text className='text-md text-gray-500 mt-1'>{recipe.strInstructions.substring(0, 50)} ...</Text>
            <View className='flex-1 flex flex-row items-center'>
                <View className='flex flex-row items-center'>
                    <MapPinIcon color='red' />
                    <Text className='ml-1 text-md'>{recipe.strArea}</Text>
                </View>
                <View className='flex flex-row items-center ml-2'>
                    <StarIcon color='green'/>
                    <Text className='ml-1 text-md'>{recipe.strCategory}</Text>
                </View>
            </View>
        </View>
        </View>
  )
}