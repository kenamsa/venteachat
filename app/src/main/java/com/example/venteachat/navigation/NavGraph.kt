package com.example.venteachat.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.venteachat.Screen.PartDetailScreen
import com.example.venteachat.Screen.PartListScreen

sealed class Screen(val route: String) {
    object PartList : Screen("part_list")
    object PartDetail : Screen("part_detail/{partId}") {
        fun createRoute(partId: Int) = "part_detail/$partId"
    }
}

@Composable
fun AppNavGraph(navController: NavHostController = rememberNavController()) {
    NavHost(navController, startDestination = Screen.PartList.route) {
        composable(Screen.PartList.route) {
            PartListScreen(navController)
        }
        composable(Screen.PartDetail.route) { backStackEntry ->
            val partId = backStackEntry.arguments?.getString("partId")?.toInt() ?: -1
            PartDetailScreen(partId)
        }
    }
}
