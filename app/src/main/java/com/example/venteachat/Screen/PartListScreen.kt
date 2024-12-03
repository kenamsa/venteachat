package com.example.venteachat.Screen

import coil.compose.rememberAsyncImagePainter
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.venteachat.model.CarPart
import com.example.venteachat.model.sampleParts
import com.example.venteachat.navigation.Screen

@Composable
fun PartListScreen(navController: NavController) {
    LazyColumn(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        items(sampleParts) { part ->
            PartItem(part = part, onClick = {
                navController.navigate(Screen.PartDetail.createRoute(part.id))
            })
        }
    }
}

@Composable
fun PartItem(part: CarPart, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)
            .clickable(onClick = onClick),
        elevation = CardDefaults.cardElevation(8.dp)
    ) {
        Row(modifier = Modifier.padding(16.dp)) {
            Image(
                painter = rememberAsyncImagePainter(part.imageUrl),
                contentDescription = null,
                modifier = Modifier.size(80.dp),
                contentScale = ContentScale.Crop
            )
            Spacer(modifier = Modifier.width(16.dp))
            Column {
                Text(
                    text = part.name,
                    style = androidx.compose.material3.MaterialTheme.typography.titleLarge
                )
                Text(
                    text = "$${part.price}",
                    style = MaterialTheme.typography.bodyLarge
                )
                RatingBar(rating = part.rating)
            }
        }
    }
}