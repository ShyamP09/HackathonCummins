#include <iostream>
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <bits/stdc++.h>
using namespace std;


class MusicGraph
{
private:
    unordered_map<string, unordered_set<string>> userToSongEdges;  // Edges connecting users to songs
    unordered_map<string, unordered_set<string>> songToGenreEdges; // Edges connecting songs to genres
    unordered_map<string, unordered_set<string>> userToGenreEdges; // Edges connecting users to genres

public:
    // Add a user-song relationship to the graph
    void addUserSongRelationship(string userId, string songId)
    {
        userToSongEdges[userId].insert(songId);
    }

    // Add a song-genre relationship to the graph
    void addSongGenreRelationship(string songId, string genreId)
    {
        songToGenreEdges[songId].insert(genreId);
    }

    // Add a user-genre relationship to the graph
    void addUserGenreRelationship(string userId, string genreId)
    {
        userToGenreEdges[userId].insert(genreId);
    }

    // Prstring the graph
    void prstringGraph()
    {
        cout << "User-Song Relationships:" << endl;
        prstringEdges(userToSongEdges);
        cout << "Song-Genre Relationships:" << endl;
        prstringEdges(songToGenreEdges);
        cout << "User-Genre Relationships:" << endl;
        prstringEdges(userToGenreEdges);
    }
    void getgenre()
    {
        map<string, int> m;
        for (const auto &entry : userToSongEdges)
        {
            // cout << "Node " << entry.first << ": ";
            // entry.first user
            // entry .second songs
            for (string id : entry.second)
            {
                unordered_set<string> v = songToGenreEdges[id];
                for (auto it = v.begin(); it != v.end(); it++)
                {
                    // prstringing the category
                    //  cout<<entry.first<<"-user"<<endl;
                    //  cout<<*it<<" ";
                    userToGenreEdges[entry.first].insert(*it);
                }
                prstringEdges(userToGenreEdges);

                cout << endl;
            }
        }
    }

private:
    // Helper function to prstring edges for a given relationship type
    void prstringEdges(const unordered_map<string, unordered_set<string>> &edges)
    {
        for (const auto &entry : edges)
        {
            cout << "Node " << entry.first << ": ";
            for (string id : entry.second)
            {
                cout << id << " ";
            }
            cout << endl;
        }
    }
};

int main()
{
    // Create a MusicGraph instance
    MusicGraph musicGraph;

    // Add sample relationships

    musicGraph.addUserSongRelationship("shubham", "tere naam"); // User 1 listened to song 101
    musicGraph.addUserSongRelationship("ashok", "dil boya");    // User 2 listened to song 102
    musicGraph.addUserSongRelationship("shubham", "humma");     // User 1 listened to song 103

    musicGraph.addSongGenreRelationship("tere naam", "sad"); // Song 101 belongs to genre 201
    musicGraph.addSongGenreRelationship("dil boya", "love"); // Song 102 belongs to genre 202
    musicGraph.addSongGenreRelationship("humma", "party");   // song 103
    musicGraph.addSongGenreRelationship("humma", "love");
    musicGraph.getgenre();

    // Prstring the graph
    // musicGraph.prstringGraph();

    return 0;
}
