function StatsBar ({ stats }) {
    return ( 
        <div className="stats-bar">
            <div className="stat-card">
                <h3>Total Listings</h3>
                <p>{stats.totalListings}</p>
            </div>

            <div className="stat-card">
                <h3>Average Price</h3>
                <p>{Math.round(stats.averagePrice)} SEK</p>
            </div>
        </div>
    );
}

export default StatsBar;