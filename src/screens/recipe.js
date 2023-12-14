import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { ScrollView } from 'react-native'
import { ArrowSmallLeftIcon, MapPinIcon, FireIcon, StarIcon } from 'react-native-heroicons/solid'
import { TouchableOpacity } from 'react-native'
import { BookmarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/theme'

export default function Recipe({ route }) {
    const {item} = route.params
    const naviagation = useNavigation()
    const { isDarkMode, toggleTheme } = useTheme();
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
      const updatedIngredients = []
      for (let i = 1; i <= 20; i++) {
        if(item[`strIngredient${i}`]){
            const ingredientName = item[`strIngredient${i}`]
            const ingredientMeasure = item[`strMeasure${i}`]
            const ingredient = `${ingredientName} : ${ingredientMeasure}`  

            updatedIngredients.push(ingredient)
        }else{
          break
        }
      }
      setIngredients(updatedIngredients)
      console.log(ingredients)
    }, [item])

  return (
    <View className='flex-1 relative bg-white'>
      <Image className='h-1/2 w-full' source={{uri: item.strMealThumb}}/>
      <View className='absolute mt-7 px-3 flex flex-row justify-between w-full'>
        <TouchableOpacity onPress={() => naviagation.navigate('Home')} className='p-4 rounded-3xl' style={{backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
            <ArrowSmallLeftIcon size={30} color='white' opacity='100%' />
        </TouchableOpacity>
        <TouchableOpacity className='p-4 rounded-3xl' style={{backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
            <BookmarkIcon size={30} color='white' />
        </TouchableOpacity>
      </View>
      <View className='absolute bottom-0 h-[60%] w-full py-5 px-8 rounded-t-3xl' style={{backgroundColor: isDarkMode ? '#323031' : '#FFFFFF'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text className='text-3xl' style={{fontFamily: 'kalnia-semiBold', color: isDarkMode && 'white'}} >{item.strMeal}</Text>
            <View className='flex flex-row mt-5 justify-between' >
                <View className='w-[45%] py-4 px-2 items-center bg-green-300 rounded-3xl'>
                    <FireIcon size={40} color='green'/>
                    <Text className='text-lg mt-1 text-green-800' style={{fontFamily: 'poppins'}}>{item.strCategory} min</Text>
                </View>
                <View className='w-[45%] py-4 px-2 items-center bg-red-300 rounded-3xl'>
                    <MapPinIcon size={40} color='red'/>
                    <Text className='text-lg mt-1 text-red-800 text-center' style={{fontFamily: 'poppins'}}>{item.strArea}</Text>
                </View>
            </View>
            <View className='mt-4'>
                <Text className='text-lg' style={{fontFamily: 'poppins-semiBold', color: isDarkMode && 'white'}}>Ingrediens :</Text>
                {ingredients.length > 0 ? (
        <View>
          {ingredients.map((ingredient, index) => (
            <Text
              key={index}
              className='text-md'
              style={{ fontFamily: 'poppins', color: isDarkMode && 'white' }}
            >
              {ingredient}
            </Text>
          ))}
        </View>
        ) : (
          <Text className='text-md' style={{ fontFamily: 'poppins', color: isDarkMode && 'white' }}>
            No ingredients available.
          </Text>
      )}
            </View>
            <View className='mt-4'>
                <Text className='text-lg' style={{fontFamily: 'poppins-semiBold', color: isDarkMode && 'white'}}>Description :</Text>
                <Text className='text-md' style={{fontFamily: 'poppins', color: isDarkMode && 'white'}}>{item.description}</Text>
            </View>
        </ScrollView>
      </View>
    </View>
  )
}