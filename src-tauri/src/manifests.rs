use serde_derive::Deserialize;
use serde_derive::Serialize;

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Manifests {
    pub c1s2: Season,
    pub c1s3: Season,
    pub c1s4: Season,
    pub c1s7: Season,
    pub c1s8: Season,
    pub c1s9: Season,
    pub c1s10: Season,
    pub c2s1: Season,
    pub c2s2: Season,
    pub c2s3: Season,
    pub c2s4: Season,
    pub c2s5: Season,
    pub c2s6: Season,
    pub c2s7: Season,
    pub c2s8: Season,
    pub c3s1: Season,
    pub c3s2: Season,
    pub c3s3: Season,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Season {
    pub short_name: String,
    pub season_name: String,
    pub icon: String,
    pub banner: String,
    pub manifests: Vec<Manifest>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Manifest {
    pub name: String,
    pub version: String,
    pub id: String,
    pub url: String,
    pub icon: String,
    pub banner: String,
}
