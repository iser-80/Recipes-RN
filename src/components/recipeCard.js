import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { ClockIcon, MapPinIcon, StarIcon } from 'react-native-heroicons/solid'
import { Touchable } from 'react-native'


export default function RecipeCard({ recipe }) {
    // const description = recipe.summary.substring(0, 60)
    const recipeTitle = recipe.strMeal && recipe.strMeal.substring(0, 20)
    
  return (
        <View className='w-full h-[120px] mb-4 flex flex-row bg-neutral-50 rounded-md overflow-hidden' style={{elevation: 3}}>
            <Image source={{uri: recipe.strMealThumb}} className='h-full w-[30%]'/>
            <View className='flex-1 px-3 py-2 relative'> 
                <Text className='text-xl' style={{fontFamily: 'poppins-semiBold'}}>{recipeTitle}{recipeTitle.length >= 20 && '...'}</Text>
                <Text className='text-md text-gray-500 mt-1 ml-2'>{recipe.strTags ? recipe.strTags.substring(0, 30) : 'This Meal Has No Tags'}</Text>
                <View className='flex-1 flex flex-row items-center absolute bottom-3 left-4'>
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