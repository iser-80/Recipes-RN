import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { ClockIcon, StarIcon } from 'react-native-heroicons/solid'
import { Touchable } from 'react-native'


export default function RecipeCard({ recipe }) {
    const description = recipe.summary.substring(0, 60)
    const recipeTitle = recipe.title.substring(0, 40)
    
  return (
        <View className='w-full h-[120px] mb-2 flex flex-row bg-white rounded-md overflow-hidden' style={{elevation: 5}}>
        <Image source={{uri: recipe.image}} className='h-full w-[30%]'/>
        <View className='flex-1 px-3 py-2'> 
            <Text className='text-base' style={{fontFamily: 'poppins'}}>{recipeTitle}</Text>
            <Text className='text-md text-gray-500'>{recipe.license}</Text>
            <View className='flex-1 flex flex-row items-center'>
                <View className='flex flex-row items-center'>
                    <ClockIcon color='green' />
                    <Text className='ml-1 text-md'>{recipe.readyInMinutes} min</Text>
                </View>
                <View className='flex flex-row items-center ml-2'>
                    <StarIcon color='yellow'/>
                    <Text className='ml-1 text-md'>{recipe.healthScore}</Text>
                </View>
            </View>
        </View>
        </View>
  )
}