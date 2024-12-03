package com.example.venteachat.Screen

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import coil.compose.rememberAsyncImagePainter
import com.example.venteachat.R
import com.example.venteachat.model.sampleParts

@Composable
fun PartDetailScreen(partId: Int) {
    val part = sampleParts.find { it.id == partId } ?: return

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Image(
            painter = rememberAsyncImagePainter(part.imageUrl),
            contentDescription = null,
            modifier = Modifier
                .fillMaxWidth()
                .height(200.dp),
            contentScale = ContentScale.Crop
        )
        Spacer(modifier = Modifier.height(16.dp))
        Text(text = part.name, style = MaterialTheme.typography.headlineMedium)
        Text(text = "Price: $${part.price}", style = MaterialTheme.typography.bodyLarge)
        RatingBar(rating = part.rating)
        Spacer(modifier = Modifier.height(8.dp))
        Text(text = part.description, style = MaterialTheme.typography.bodyMedium)
        Spacer(modifier = Modifier.height(16.dp))
        Button(onClick = { /* Handle buy logic */ }) {
            Text("Buy Now")
        }
    }
}
