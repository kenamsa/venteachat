package com.example.venteachat
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch
import androidx.navigation.compose.rememberNavController
import android.annotation.SuppressLint
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavGraph
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController

import com.example.venteachat.navigation.AppNavGraph
import com.example.venteachat.navigation.Screen
import kotlinx.coroutines.launch


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen() {
    val navController = rememberNavController()
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    val scope = rememberCoroutineScope()

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color.White) // Set the desired background color
            ) {
            DrawerContent(onHomeClick = {
                navController.navigate(Screen.PartList.route) { // Corrected line
                    popUpTo(Screen.PartList.route) { inclusive = true }
                }
                scope.launch { drawerState.close() }
            })
        }}
    ) {
        Scaffold(
            topBar = { SimpleTopBar(onMenuClick = { scope.launch { drawerState.open() } }) },
            bottomBar = { BottomBar(onHomeClick = {
                navController.navigate(Screen.PartList.route) { // Corrected line
                    popUpTo(Screen.PartList.route) { inclusive = true }
                }
            }) },
            content = { innerPadding ->
                Box(modifier = Modifier.padding(innerPadding)) {
                    AppNavGraph(navController = navController)
                }
            }
        )
    }
}

@Composable
fun DrawerContent(onHomeClick: () -> Unit) {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text(
            "Home",
            modifier = Modifier
                .fillMaxWidth()
                .clickable { onHomeClick() }
                .padding(vertical = 16.dp),
            color = Color.Black // Change to your desired text color
        )
        Text(
            "Profile",
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 16.dp),
            color = Color.Black // Change to your desired text color
        )
        Text(
            "Settings",
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 16.dp),
            color = Color.Black // Change to your desired text color
        )
    }
}

@Composable
fun BottomBar(onHomeClick: () -> Unit) {
    BottomAppBar {
        Text("Home", modifier = Modifier.weight(1f).clickable { onHomeClick() }, textAlign = TextAlign.Center)
        Text("Profile", modifier = Modifier.weight(1f), textAlign = TextAlign.Center)
        Text("Settings", modifier = Modifier.weight(1f), textAlign = TextAlign.Center)
    }
}
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SimpleTopBar(onMenuClick: () -> Unit) {
    // Use TopAppBar with proper color parameters
    CenterAlignedTopAppBar(
        title = { Text("Welcome Back") },
        navigationIcon = {
            IconButton(onClick = onMenuClick) {
                Icon(Icons.Filled.Menu, contentDescription = "Menu")
            }
        },
        colors = TopAppBarDefaults.centerAlignedTopAppBarColors(
            containerColor = Color.Transparent,
            titleContentColor = Color.White
        )
    )
}
@Preview(showBackground = true)
@Composable
fun PreviewMainScreen() {
    MainScreen()
}
